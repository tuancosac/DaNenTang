import { Controller, Get } from '@nestjs/common';
import { TestDbService } from '../Test/test-db.service';

@Controller('test-db')
export class TestDbController {
  constructor(
    private readonly testDbService: TestDbService,
  ) {}

  @Get()
  testDatabase() {
    return this.testDbService.testDatabase();
  }
}