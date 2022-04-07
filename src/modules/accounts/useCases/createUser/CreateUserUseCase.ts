import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const hashedPassword = await hash(password, 9);
    const emailAlreadyBeingUsed = await this.userRepository.findByEmail(email);
    if (emailAlreadyBeingUsed) {
      throw new AppError('This email is already being used');
    }
    await this.userRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });
  }
}
