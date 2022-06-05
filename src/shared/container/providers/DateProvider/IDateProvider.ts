export interface IDateProvider {
  compareInHours(initial_date: Date, end_date: Date): number;
  compareInDays(initial_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfIsBefore(start_date: Date, end_date: Date): boolean;
}
