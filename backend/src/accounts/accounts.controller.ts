import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  detailAccount(@Param('id') id: string) {
    return this.accountService.detailAccount(id);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() AccountDto: AccountDto) {
    return this.accountService.register(AccountDto);
  }
}