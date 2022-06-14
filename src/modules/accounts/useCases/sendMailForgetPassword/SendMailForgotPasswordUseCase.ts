import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { ITokenRepository } from '@modules/accounts/repositories/ITokenRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class SendMailForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    const emailTemplatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new AppError('User does not exist');
    }
    const token = uuidV4();
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_PASSWORD_URL}${token}`,
    };
    const expires_date = this.dateProvider.addHours(3);
    await this.tokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      emailTemplatePath,
    );
  }
}
