import { Controller, Get } from '@nestjs/common';
// import { AppService } from 'src/app.service';
import { AstronomyService } from './astronomy.service';

@Controller('astronomy')
export class AstronomyController {
  constructor(private readonly astronomyService: AstronomyService) {}

  @Get('eclipse')
  getEclipseEvents() {
    return this.astronomyService.getEclipseEvents();
  }

  @Get('moon')
  getMoonEvents() {
    return this.astronomyService.getMoonEvents();
  }
}
