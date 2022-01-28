import { UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { User, UserDocument } from 'src/users/models/_user.model';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { WebsocketsExceptionFilter } from './filters/WebsocketsException.filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected');

    // if (user) client.join(`user_${user._id}`);
    // else client.disconnect();
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnected');
  }

  @SubscribeMessage('signin')
  async signin(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.join(`${data.id}`);
    console.log(`join ${data.id}`);
  }

  @SubscribeMessage('message')
  async message(@MessageBody() data: any) {
    this.server.to(`${data.targetId}`).emit('message', data);
  }

  @SubscribeMessage('image')
  async image(@MessageBody() data: any) {
    this.server.to(`${data.targetId}`).emit('image', data);
  }
}
