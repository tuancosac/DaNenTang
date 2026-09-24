import { Injectable } from '@nestjs/common';
import * as Astronomy from 'astronomy-engine';

@Injectable()
export class AstronomyService {
  getMoonEvents() {
    const now = new Date();

    const newMoon = Astronomy.SearchMoonPhase(0, now, 30);

    const firstQuarter = Astronomy.SearchMoonPhase(90, now, 30);

    const fullMoon = Astronomy.SearchMoonPhase(180, now, 30);

    const lastQuarter = Astronomy.SearchMoonPhase(270, now, 30);

    if (!newMoon || !firstQuarter || !fullMoon || !lastQuarter) {
      throw new Error('Cannot find Moon data');
    }

    return [
      {
        id: 'new-moon',
        title: 'Trăng non',
        type: 'moon',
        date: newMoon.date,
        description: 'Pha trăng non',
        icon: '🌑',
      },
      {
        id: 'first-quarter',
        title: 'Trăng bán nguyệt đầu tháng',
        type: 'moon',
        date: firstQuarter.date,
        description: 'Pha thượng huyền',
        icon: '🌓',
      },
      {
        id: 'full-moon',
        title: 'Trăng tròn',
        type: 'moon',
        date: fullMoon.date,
        description: 'Pha trăng tròn',
        icon: '🌕',
      },
      {
        id: 'last-quarter',
        title: 'Trăng bán nguyệt cuối tháng',
        type: 'moon',
        date: lastQuarter.date,
        description: 'Pha hạ huyền',
        icon: '🌗',
      },
    ];
  }

  getEclipseEvents() {
    const now = new Date();

    const lunar = Astronomy.SearchLunarEclipse(now);
    const solar = Astronomy.SearchGlobalSolarEclipse(now);

    if (!lunar || !solar) {
      throw new Error('Cannot find Eclipse Events');
    }

    return [
      {
        id: 'lunar-eclipse',
        title: 'Nguyệt thực',
        type: 'eclipse',
        date: lunar.peak ? lunar.peak.date : new Date(),
        description: `Nguyệt thực (Pha/Loại: ${lunar.kind}, Độ che khuất: ${lunar.obscuration})`,
        icon: '🌕',
      },
      {
        id: 'solar-eclipse',
        title: 'Nhật thực',
        type: 'eclipse',
        date: solar.peak ? solar.peak.date : new Date(),
        description: `Nhật thực (Loại: ${solar.kind}${solar.latitude !== undefined ? `, Tọa độ: ${solar.latitude}°,${solar.longitude}°` : ''})`,
        icon: '☀️',
      },
    ];
  }

  getAllEvents() {
    const moonEvents = this.getMoonEvents();
    const eclipseEvents = this.getEclipseEvents();

    return [...moonEvents, ...eclipseEvents];
  }
}
