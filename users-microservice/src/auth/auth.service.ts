import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { compare, hash } from 'bcrypt';
import { SuccessResponse } from 'src/core/shared/sucess.response';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schemas/refreshtoken.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name)
        private refreshTokenModel: Model<RefreshToken>,
        private readonly jwtService: JwtService,
    ) { }

    async signUp(data: SignupDTO) {
        const { username, password } = data;


        const usernameExist = await this.userModel.findOne({ username });
        if (usernameExist)
            throw new RpcException(new ConflictException('Username already exists'));

        const hashedPassword = await hash(password, 10);

        const user = await this.userModel.create({ username, password: hashedPassword });

        return new SuccessResponse({
            data: user,
            message: 'User Created Successfully',
        });
    }

    async login(data: any) {
        const { username, password } = data;

        const user = await this.userModel.findOne({ username });
        if (!user)
            throw new RpcException(new UnauthorizedException('Invalid Username'));

        try {

            const passwordMatch = await hash(password, 10) === user.password;
            if (passwordMatch)
                throw new RpcException(new UnauthorizedException('Invalid Password'));
        } catch (error) {
            throw new RpcException(error);
        }


        const { password: _, ...userDetails } = user.toObject({
            versionKey: false,
        });

        const { accessToken } = await this.generateAccessToken({
            username,
            id: userDetails._id,
        });

        return new SuccessResponse({
            message: 'Login Successful',
            data: { ...userDetails, accessToken },
        });
    }

    private async generateAccessToken(data: { username: string; id: any }) {
        const accessToken = this.jwtService.sign(data, { expiresIn: '5h' });
        const refreshToken = uuidv4();

        await this.storeRefreshToken(refreshToken, data.id);
        return { accessToken, refreshToken };
    }

    private async storeRefreshToken(token: string, userId: Types.ObjectId) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 3);

        const newToken = await this.refreshTokenModel.create({
            token,
            userId,
            expires,
        });
    }
}
