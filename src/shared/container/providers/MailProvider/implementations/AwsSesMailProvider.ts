import { SES } from 'aws-sdk';
import fs from 'fs';
import hadlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

export class AwsSesMailProvider implements IMailProvider {
  private cliente: Transporter;

  constructor() {
    this.cliente = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_SES_REGION,
      }),
    });
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = hadlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    const message = await this.cliente.sendMail({
      to,
      from: 'Rentx <admin@petsjaragua.com.br>',
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
