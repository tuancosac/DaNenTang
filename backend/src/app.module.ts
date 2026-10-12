import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstronomyModule } from './astronomy/astronomy.module';
import { AccountModule } from './accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDbModule } from './Test/test-db.module';

@Module({
  imports: [
    AstronomyModule,
    AccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),

    TestDbModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
