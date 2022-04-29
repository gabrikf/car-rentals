export interface IDateProvider {
  compare(initial_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}
