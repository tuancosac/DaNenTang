import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../accounts/accounts.service';
import { AuthService } from './auth.service';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));
jest.mock('../accounts/accounts.service', () => ({
  AccountService: class AccountService {},
}));

describe('AuthService', () => {
  let service: AuthService;
  let accountService: { findByEmail: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    accountService = { findByEmail: jest.fn() };
    jwtService = { signAsync: jest.fn().mockResolvedValue('signed-token') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AccountService, useValue: accountService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns a signed token and safe user data for valid credentials', async () => {
    const password = 'password123';
    accountService.findByEmail.mockResolvedValue({
      _id: { toString: () => 'account-id' },
      username: 'astro-user',
      email: 'astro@example.com',
      password: await bcrypt.hash(password, 4),
    });

    await expect(
      service.login({ email: 'astro@example.com', password }),
    ).resolves.toEqual({
      message: 'Đăng nhập thành công',
      accessToken: 'signed-token',
      user: {
        id: 'account-id',
        username: 'astro-user',
        email: 'astro@example.com',
      },
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      id: 'account-id',
      email: 'astro@example.com',
    });
  });

  it('rejects an unknown email', async () => {
    accountService.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({ email: 'missing@example.com', password: 'password123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rejects an incorrect password', async () => {
    accountService.findByEmail.mockResolvedValue({
      _id: { toString: () => 'account-id' },
      username: 'astro-user',
      email: 'astro@example.com',
      password: await bcrypt.hash('correct-password', 4),
    });

    await expect(
      service.login({ email: 'astro@example.com', password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
