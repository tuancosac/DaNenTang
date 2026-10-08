import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';

@Controller('accounts') 
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() AccountDto: AccountDto) {
    return this.accountService.register(AccountDto);
  }
}