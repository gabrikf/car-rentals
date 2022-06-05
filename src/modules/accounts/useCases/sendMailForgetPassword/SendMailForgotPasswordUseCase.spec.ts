import { TokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/TokenRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { ITokenRepository } from '@modules/accounts/repositories/ITokenRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendMailForgotPasswordUseCase } from './SendMailForgotPasswordUseCase';

let sendMailForgotPasswordUseCase: SendMailForgotPasswordUseCase;
let userRepository: IUserRepository;
let dateProvider: IDateProvider;
let tokenRepository: ITokenRepository;
let mailProvider: IMailProvider;

describe('SendMailForgotPasswordUseCase', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    tokenRepository = new TokenRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendMailForgotPasswordUseCase = new SendMailForgotPasswordUseCase(
      userRepository,
      tokenRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to users', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await userRepository.create({
      driver_license: '869394',
      email: 'alifikfub@fadtalto.td',
      name: 'Ronald Dawson',
      password: '05858178',
      avatar: 'www.com.br',
    });
    await sendMailForgotPasswordUseCase.execute('alifikfub@fadtalto.td');
    expect(sendMail).toBeCalled();
  });
  it('Should not be able to send an email if user do not exist', async () => {
    await expect(
      sendMailForgotPasswordUseCase.execute('ui@ui.ui'),
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('Should be able to create an user token', async () => {
    const tokensRepository = jest.spyOn(tokenRepository, 'create');
    await userRepository.create({
      driver_license: '869392',
      email: 'aiiaiaiia@fadtalto.td',
      name: 'Ronaldinho Dawson',
      password: '05858178',
      avatar: 'www.com.br',
    });
    await sendMailForgotPasswordUseCase.execute('aiiaiaiia@fadtalto.td');
    expect(tokensRepository).toBeCalled();
  });
});
