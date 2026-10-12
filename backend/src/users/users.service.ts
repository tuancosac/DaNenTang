import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import {
  User,
  UserDocument,
} from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ĐĂNG KÝ
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'Username hoặc email đã tồn tại',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return {
      message: 'Đăng ký thành công',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        fullName: savedUser.fullName,
        avatar: savedUser.avatar,
        role: savedUser.role,
      },
    };
  }

  // LẤY TẤT CẢ
  async findAll() {
    return this.userModel
      .find()
      .select('-password')
      .exec();
  }

  // LẤY THEO ID
  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    return user;
  }

  // Tìm theo email - dùng cho login
  async findByEmail(email: string) {
    return this.userModel
      .findOne({ email })
      .exec();
  }

  // CẬP NHẬT
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    const data: any = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(
        updateUserDto.password,
        10,
      );
    }

    delete data.password;

    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        },
      )
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    return {
      message: 'Cập nhật thành công',
      user,
    };
  }

  // XÓA
  async remove(id: string) {
    const user = await this.userModel
      .findByIdAndDelete(id)
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    return {
      message: 'Xóa người dùng thành công',
      user,
    };
  }
}