import { Module } from '@nestjs/common';
import { PhoneConfirmationService } from './phone-confirmation.service';
import { PhoneConfirmationController } from './phone-confirmation.controller';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
 
})
export class PhoneConfirmationModule {}
