import { Injectable } from '@nestjs/common';
// import * as Astronomy from 'astronomy-engine';

@Injectable()
export class AstronomyService {
  private moonEvents = [
    {
      id: 'new-moon',
      title: 'Trăng non',
      type: 'moon',
      date: '2026-10-10T15:50:36.724Z',
      description: 'Pha trăng non',
      icon: '🌑',
    },
    {
      id: 'first-quarter',
      title: 'Trăng bán nguyệt đầu tháng',
      type: 'moon',
      date: '2026-10-18T16:13:19.496Z',
      description: 'Pha thượng huyền',
      icon: '🌓',
    },
    {
      id: 'full-moon',
      title: 'Trăng tròn',
      type: 'moon',
      date: '2026-09-26T16:49:32.233Z',
      description: 'Pha trăng tròn',
      icon: '🌕',
    },
    {
      id: 'last-quarter',
      title: 'Trăng bán nguyệt cuối tháng',
      type: 'moon',
      date: '2026-10-03T13:25:33.710Z',
      description: 'Pha hạ huyền',
      icon: '🌗',
    },
  ];

  getMoonEvents() {
    return this.moonEvents;
  }

  getMoonEvent(index: number) {
    if (!this.moonEvents[index]) {
      return { message: 'Cannot find data' };
    }
    return this.moonEvents[index];
  }

  create(body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.moonEvents.push(body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Created successfully', data: body };
  }

  update(index: number, body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.moonEvents[index] = body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Updated successfully', data: body };
  }

  patch(index: number, body: any) {
    // this.moonEvents[index] = body
    const oldMoonEvens = this.moonEvents[index];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.moonEvents[index] = { ...oldMoonEvens, ...body };
    return { message: 'Patched successfully', data: this.moonEvents[index] };
  }

  remove(index: number) {
    const deleted = this.moonEvents.splice(index, 1);
    return { message: 'Deleted successfully', data: deleted[0] };
  }

  // getMoonEvents() {
  //   const now = new Date();

  //   const newMoon = Astronomy.SearchMoonPhase(0, now, 30);

  //   const firstQuarter = Astronomy.SearchMoonPhase(90, now, 30);

  //   const fullMoon = Astronomy.SearchMoonPhase(180, now, 30);

  //   const lastQuarter = Astronomy.SearchMoonPhase(270, now, 30);

  //   if (!newMoon || !firstQuarter || !fullMoon || !lastQuarter) {
  //     throw new Error('Cannot find Moon data');
  //   }

  //   return [
  //     {
  //       id: 'new-moon',
  //       title: 'Trăng non',
  //       type: 'moon',
  //       date: newMoon.date,
  //       description: 'Pha trăng non',
  //       icon: '🌑',
  //     },
  //     {
  //       id: 'first-quarter',
  //       title: 'Trăng bán nguyệt đầu tháng',
  //       type: 'moon',
  //       date: firstQuarter.date,
  //       description: 'Pha thượng huyền',
  //       icon: '🌓',
  //     },
  //     {
  //       id: 'full-moon',
  //       title: 'Trăng tròn',
  //       type: 'moon',
  //       date: fullMoon.date,
  //       description: 'Pha trăng tròn',
  //       icon: '🌕',
  //     },
  //     {
  //       id: 'last-quarter',
  //       title: 'Trăng bán nguyệt cuối tháng',
  //       type: 'moon',
  //       date: lastQuarter.date,
  //       description: 'Pha hạ huyền',
  //       icon: '🌗',
  //     },
  //   ];
  // }

  // getEclipseEvents() {
  //   const now = new Date();

  //   const lunar = Astronomy.SearchLunarEclipse(now);
  //   const solar = Astronomy.SearchGlobalSolarEclipse(now);

  //   if (!lunar || !solar) {
  //     throw new Error('Cannot find Eclipse Events');
  //   }

  //   return [
  //     {
  //       id: 'lunar-eclipse',
  //       title: 'Nguyệt thực',
  //       type: 'eclipse',
  //       date: lunar.peak ? lunar.peak.date : new Date(),
  //       description: `Nguyệt thực (Pha/Loại: ${lunar.kind}, Độ che khuất: ${lunar.obscuration})`,
  //       icon: '🌕',
  //     },
  //     {
  //       id: 'solar-eclipse',
  //       title: 'Nhật thực',
  //       type: 'eclipse',
  //       date: solar.peak ? solar.peak.date : new Date(),
  //       description: `Nhật thực (Loại: ${solar.kind}${solar.latitude !== undefined ? `, Tọa độ: ${solar.latitude}°,${solar.longitude}°` : ''})`,
  //       icon: '☀️',
  //     },
  //   ];
  // }

  // getAllEvents() {
  //   const moonEvents = this.getMoonEvents();
  //   const eclipseEvents = this.getEclipseEvents();

  //   return [...moonEvents, ...eclipseEvents];
  // }

  // getMoonEvent(index: number) {
  //   const events = this.getMoonEvents();
  //   return events[index];
  // }

  // create(body: any): { message: string; data: unknown } {
  //   return {
  //     message: 'Created successfully',
  //     data: body,
  //   };
  // }

  // update(index: number, body: unknown) {
  //   const events = this.getMoonEvents();
  //   if (!events[index]) {
  //     return { message: 'nah ah' };
  //   }
  //   return {
  //     message: 'Update completed',
  //     data: body,
  //   };
  // }

  // remove(index: number) {
  //   const events = this.getMoonEvents();
  //   if (!events[index]) {
  //     return { message: 'nah ah' };
  //   }
  //   const deleted = events.splice(index, 1);
  //   return {
  //     message: 'Deleted',
  //     data: deleted[0],
  //   };
  // }
}
