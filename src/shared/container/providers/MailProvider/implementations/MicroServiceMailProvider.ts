import fs from 'fs';
import handlebars from 'handlebars';

import { mailQueue } from '@queues/mail';

import { IMailProvider } from '../IMailProvider';

class MicroServiceMailProvider implements IMailProvider {
  async sendMail(
    to: string,
    subject: string,
    variables: Record<string, unknown>,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const template = handlebars.compile(templateFileContent)(variables);

    mailQueue.add('forgot password mail', {
      to,
      from: 'Tasqcoin <noreply@tasqcoin.com.br>',
      subject,
      html: template,
    });
  }
}

export { MicroServiceMailProvider };
