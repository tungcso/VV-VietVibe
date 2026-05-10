import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './schemas/user.schema.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JWT_SECRET } from '../config/env.js';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email.toLowerCase().trim() }).exec();
    if (!user) {
      throw new UnauthorizedException('メールアドレスまたはパスワードが正しくありません');
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      throw new UnauthorizedException('メールアドレスまたはパスワードが正しくありません');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const access_token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1d' },
    );

    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        user_name: user.user_name,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.toLowerCase().trim();
    const name = registerDto.name.trim();

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('このメールアドレスはすでに使用されています');
    }

    const password_hash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userModel.create({
      email,
      user_name: name,
      password_hash,
    });

    const access_token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1d' },
    );

    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        user_name: user.user_name,
        role: user.role,
      },
    };
  }

  async logout() {
    return { message: 'ログアウトしました' };
  }
}
