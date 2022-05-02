import 'dotenv/config';

export default {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  ...(process.env.REDIS_PASS && { password: process.env.REDIS_PASS }),
};
