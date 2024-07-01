import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsClientModule } from 'src/natsclient/natsclient.module';

@Module({
  imports : [NatsClientModule],
  controllers: [AuthController]
})
export class AuthModule {}
