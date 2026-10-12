import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './accounts.service';
import { AccountController } from './accounts.controller';
import { Account, AccountSchema } from './account.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Đăng ký bảng Account với MongooseModule
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'SECRET_KEY',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService, JwtModule],
})
export class AccountModule {}
