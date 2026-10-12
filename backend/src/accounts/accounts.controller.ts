import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

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

  @Post('login')
  login(
    @Body() LoginDto: { email: string; password: string },
  ) {
    return this.accountService.login(LoginDto);
  }
}