import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TestDb } from './test-db.schema';

@Injectable()
export class TestDbService {
  constructor(
    @InjectModel(TestDb.name)
    private readonly testDbModel: Model<TestDb>,
  ) {}

  async testDatabase() {
    const data = await this.testDbModel.find().exec();

    return {
      success: true,
      message: 'Kết nối MongoDB thành công',
      data,
    };
  }
}