import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: SchemaFactory.createForClass(User) }
    ]),
  ],

  controllers: [AuthMicroserviceController],
  providers: [AuthService]
})
export class AuthModule { }
