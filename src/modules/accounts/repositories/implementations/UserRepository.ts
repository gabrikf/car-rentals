import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.repository.findOne(id);
    return user;
  }
}