import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);
export class DayJsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(initial_date: any, end_date: any): number {
    const end_date_utc = this.convertToUTC(end_date);
    const initial_date_utc = this.convertToUTC(initial_date);
    const compare = dayjs(end_date_utc).diff(initial_date_utc, 'hours');
    return compare;
  }
  compareInDays(initial_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const initial_date_utc = this.convertToUTC(initial_date);
    const compare = dayjs(end_date_utc).diff(initial_date_utc, 'days');
    return compare;
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  addDays(days: number): Date {
    return dayjs().add(days, 'day').toDate();
  }
}
