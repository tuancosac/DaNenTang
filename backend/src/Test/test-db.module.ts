import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestDbController } from '../Test/test-db.controller';
import { TestDbService } from '../Test/test-db.service';
import { TestDb, TestDbSchema } from '../Test/test-db.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TestDb.name,
        schema: TestDbSchema,
      },
    ]),
  ],
  controllers: [TestDbController],
  providers: [TestDbService],
})
export class TestDbModule {}