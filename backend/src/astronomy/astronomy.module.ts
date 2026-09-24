import { Module } from '@nestjs/common';
import { AstronomyController } from './astronomy.controller';
import { AstronomyService } from './astronomy.service';

@Module({
  controllers: [AstronomyController],
  providers: [AstronomyService],
})
export class AstronomyModule {}
