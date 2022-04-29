import { container } from 'tsyringe';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { CarImageRepository } from '@modules/cars/infra/typeorm/repositories/CarImageRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { RentalRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { IDateProvider } from './providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from './providers/DateProvider/implementations/DayJsDateProvider';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarImageRepository>(
  'CarImageRepository',
  CarImageRepository,
);

container.registerSingleton<IRentalRepository>(
  'RentalsRepository',
  RentalRepository,
);

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);
