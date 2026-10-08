import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AccountDto } from 'src/dto/account.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  // Mảng lưu danh sách tài khoản trong bộ nhớ tạm
  private accounts: any[] = [];
  private idCounter = 1;

  constructor(private readonly jwtService: JwtService) {}

  async createAccount(accountDto: AccountDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(accountDto.password, salt);

    const newAccount = {
      id: this.idCounter++,
      ...accountDto,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.accounts.push(newAccount);
    return newAccount;
  }

  async detailAccount(id: number): Promise<any | null> {
    const account = this.accounts.find((acc) => acc.id === Number(id));
    return account || null;
  }

  async updateAccount(id: number, accountDto: AccountDto): Promise<any | null> {
    const index = this.accounts.findIndex((acc) => acc.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID: ${id}`);
    }

    const updateData = { ...accountDto };
    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    this.accounts[index] = {
      ...this.accounts[index],
      ...updateData,
    };

    return this.accounts[index];
  }

  async deleteAccount(id: number): Promise<boolean> {
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter((acc) => acc.id !== Number(id));
    return this.accounts.length < initialLength;
  }

  async register(registerDto: AccountDto) {
    const { username, email, password } = registerDto;

    // 1. Kiểm tra Email hoặc Username đã tồn tại chưa
    const existingAccount = this.accounts.find(
      (acc) => acc.email === email || acc.username === username,
    );

    if (existingAccount) {
      throw new ConflictException('Email hoặc Tên người dùng đã được sử dụng');
    }

    // 2. Hash mật khẩu bằng bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Tạo tài khoản mới
    const newAccount = {
      id: this.idCounter++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.accounts.push(newAccount);

    // 4. Loại bỏ trường password trước khi trả về response
    const { password: _, ...result } = newAccount;

    return {
      message: 'Đăng ký tài khoản thành công (In-Memory Test)',
      data: result,
    };
  }
}
