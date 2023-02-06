import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://mo:18sHaAoRuTOiIAG0@cluster0.mkzmq.mongodb.net/bags',
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          connection.plugin(require('mongoose-paginate-v2'));
          return connection;
        },
      },
    ),
  ],
})
export class DatabaseModule {}
