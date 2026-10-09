import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
// import { AppService } from 'src/app.service';
import { AstronomyService } from './astronomy.service';

@Controller('astronomy')
export class AstronomyController {
  constructor(private readonly astronomyService: AstronomyService) {}

  // @Get('eclipse')
  // getEclipseEvents() {
  //   return this.astronomyService.getEclipseEvents();
  // }

  @Get('moon')
  getMoonEvents() {
    return this.astronomyService.getMoonEvents();
  }

  @Get('moon/:index')
  getMoonEvent(@Param('index') index: string) {
    return this.astronomyService.getMoonEvent(Number(index));
  }

  @Post('events')
  createEvent(@Body() body: any) {
    console.log('Result:', body);
    return this.astronomyService.create(body);
  }

  @Put('moon/:index')
  update(@Param('index') index: string, @Body() body: unknown) {
    return this.astronomyService.update(Number(index), body);
  }

  @Patch('moon/:index')
  patch(@Param('index') index: string, @Body() body: unknown) {
    return this.astronomyService.patch(Number(index), body);
  }

  @Delete('moon/:index')
  remove(@Param('index') index: string) {
    return this.astronomyService.remove(Number(index));
  }
}
