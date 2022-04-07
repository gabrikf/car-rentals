import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from '@modules/accounts/dtos/ILoginDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    email,
    password,
  }: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordHasMatch = await compare(password, user.password);
    if (!passwordHasMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, '74EBC35C58A5049F0F271EBF6F78CC8F', {
      subject: user.id,
      expiresIn: '1d',
    });
    const userAuthenticated: ILoginResponseDTO = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
    return userAuthenticated;
  }
}
