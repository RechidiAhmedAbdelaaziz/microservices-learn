import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {

    }

    async signUp(data: SignupDTO) {
        const { username, password } = data;

        const usernameExist = await this.userModel.findOne({ username });
        if (usernameExist) throw new RpcException(new ConflictException('Username already exists'));

        const hashedPassword = await hash(password, 10);

        const user = new this.userModel({ username, password: hashedPassword });
        const {password : x , ...result} = (await user.save()).toObject({ versionKey: false, });
        return result;
    }
}
