import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';
import { AccountDto } from 'src/dto/account.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // 1. Tạo tài khoản chung trực tiếp vào MongoDB
  async createAccount(accountDto: AccountDto): Promise<any> {
    const { username, email, password } = accountDto;

    const existingAccount = await this.accountModel.findOne({
      or: [{ email }, { username }],
    });
    if (existingAccount) {
      throw new ConflictException('Email hoặc Tên người dùng đã tồn tại');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAccount = await this.accountModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return newAccount;
  }

  // 2. Xem tất cả tài khoản
  async findAll(): Promise<any[]> {
    return this.accountModel
      .find()
      .select('-password')
      .lean()
      .exec();
  }

  // 3. Xem chi tiết tài khoản bằng ID
  async detailAccount(id: string): Promise<any | null> {
    const account = await this.accountModel.findById(id).select('-password');
    if (!account) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID: ${id}`);
    }
    return account;
  }

  // 3. Cập nhật tài khoản trên Cloud
  async updateAccount(id: string, accountDto: AccountDto): Promise<any | null> {
    const updateData: any = { ...accountDto };
    
    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedAccount = await this.accountModel.findByIdAndUpdate(
      id,
      { set: updateData },
      { new: true },
    );

    if (!updatedAccount) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID: ${id}`);
    }

    return updatedAccount;
  }

  // 4. Xóa tài khoản khỏi MongoDB Atlas
  async deleteAccount(id: string): Promise<boolean> {
    const result = await this.accountModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // 5. Hàm ĐĂNG KÝ chính thức lưu vào Database Cloud Explor_Astronomy
  async register(registerDto: AccountDto) {
    const { username, email, password } = registerDto;

    // Kiểm tra trùng lặp trên MongoDB Cloud thực tế
    const existingAccount = await this.accountModel.findOne({
      or: [{ email }, { username }],
    });

    if (existingAccount) {
      throw new ConflictException('Email hoặc Tên người dùng đã được sử dụng');
    }

    // Bảo mật mật khẩu bằng bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Lưu dữ liệu thực tế lên MongoDB Atlas
    const newAccount = await this.accountModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      message: 'Đăng ký tài khoản thành công vào MongoDB Atlas Cloud!',
      data: {
        id: newAccount._id,
        username: newAccount.username,
        email: newAccount.email,
        createdAt: (newAccount as any).createdAt,
      },
    };
  }
}
