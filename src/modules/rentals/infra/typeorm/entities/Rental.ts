import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Cars';

@Entity('rentals')
export class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expect_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
