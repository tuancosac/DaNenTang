import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstronomyModule } from './astronomy/astronomy.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [AstronomyModule, QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
