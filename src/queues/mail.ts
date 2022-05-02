import { Queue } from 'bullmq';

import redisConfig from '@config/redis';

export interface IMail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const mailQueue = new Queue<IMail>('mailbot', {
  connection: redisConfig,
});
