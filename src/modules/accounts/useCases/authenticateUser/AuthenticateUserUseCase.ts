import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from '@modules/accounts/dtos/ILoginDTO';
import { ITokenRepository } from '@modules/accounts/repositories/ITokenRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
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

    const token = sign({}, process.env.JWT_SECRET_TOKEN, {
      subject: user.id,
      expiresIn: auth.expires_token,
    });

    const refresh_token = sign(
      { email },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      {
        subject: user.id,
        expiresIn: auth.expires_refresh_token,
      },
    );
    await this.tokenRepository.create({
      refresh_token,
      expires_date: this.dateProvider.addDays(
        auth.expires_refresh_token_numeric,
      ),
      user_id: user.id,
    });
    const userAuthenticated: ILoginResponseDTO = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
    return userAuthenticated;
  }
}
