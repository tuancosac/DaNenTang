import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../accounts/accounts.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const account = await this.accountService.findByEmail(email);

    if (!account || !(await bcrypt.compare(password, account.password))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const id = account._id.toString();
    const accessToken = await this.jwtService.signAsync({
      id,
      email: account.email,
    });

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      user: {
        id,
        username: account.username,
        email: account.email,
      },
    };
  }
}
