import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    MongooseModule.forRoot('mongodb://mongo:27017', {
      dbName: 'user',
      connectionFactory: (connection) => {
        if (connection.readyState === 1) {
          console.log('Database Connected successfully >> ', connection.name);
        }
        connection.on('disconnected', () => {
          console.log('Database disconnected');
        });
        connection.on('error', (error) => {
          console.log('Database connection failed! for error: ', error);
        });

        return connection;
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
