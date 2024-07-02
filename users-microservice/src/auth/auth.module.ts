import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { RefreshToken } from 'src/schemas/refreshtoken.schema';

@Module({
  imports: [

    MongooseModule.forFeature([
      { name: User.name, schema: SchemaFactory.createForClass(User) },
      { name: RefreshToken.name, schema: SchemaFactory.createForClass(RefreshToken) }
    ]),
  ],

  controllers: [AuthMicroserviceController],
  providers: [AuthService]
})
export class AuthModule { }
