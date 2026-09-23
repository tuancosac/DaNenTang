import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstronomyModule } from './astronomy/astronomy.module';

@Module({
  imports: [AstronomyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
