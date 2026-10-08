// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Ví dụ kiểm tra dữ liệu giả lập (Sau này bạn sẽ check với Database)
    if (email === 'admin@gmail.com' && password === '123456') {
      return {
        message: 'Đăng nhập thành công',
        accessToken: 'fake-jwt-token-example',
      };
    }

    throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
  }
}
