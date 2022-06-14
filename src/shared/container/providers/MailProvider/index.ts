import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { AwsSesMailProvider } from './implementations/AwsSesMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';

const mailProvider = {
  etherial: container.resolve(EtherealMailProvider),
  aws_ses: container.resolve(AwsSesMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
