import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstronomyModule } from './astronomy/astronomy.module';
import { AccountModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AstronomyModule,
    AccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}