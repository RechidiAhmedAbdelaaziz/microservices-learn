import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModel } from './users/user.module';
import { NatsClientModule } from './natsclient/natsclient.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    NatsClientModule,
    UsersModel,
    PaymentsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
