import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ITokenRepository } from '@modules/accounts/repositories/ITokenRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Invalid token');
    }
    if (
      this.dateProvider.compareIfIsBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Expired token');
    }
    const user = await this.userRepository.findById(userToken.user_id);
    user.password = await hash(password, 8);
    await this.userRepository.create(user);
    await this.tokenRepository.deleteById(userToken.id);
  }
}
