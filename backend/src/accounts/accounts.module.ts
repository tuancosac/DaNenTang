import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AccountService } from './accounts.service';
import { AccountController } from './accounts.controller';
import { Account, AccountSchema } from './account.schema';
@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('Thiếu JWT_SECRET trong file .env');
        }

        return {
          secret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],

  // Chỉ khai báo các class có @Controller()
  controllers: [AccountController],

  // Các service đặt trong providers
  providers: [AccountService],

  // Export module hoặc service để module khác sử dụng
  exports: [AccountService, JwtModule],
})
export class AccountModule {}
