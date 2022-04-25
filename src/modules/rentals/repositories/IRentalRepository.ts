export interface IRentalRepository {
  findOpenRentalByCar(): Promise<Rental>;
  findOpenRentalByUser: Promise<Rental>;
}
