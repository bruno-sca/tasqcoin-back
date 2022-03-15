import 'dotenv/config';

export default {
  secret_token: process.env.AUTH_SECRET_TOKEN,
  secret_refresh_token: process.env.AUTH_SECRET_REFRESH_TOKEN,
  expires_in_token: process.env.AUTH_EXPIRES_IN_TOKEN,
  expires_in_refresh_token: process.env.AUTH_EXPIRES_IN_REFRESH_TOKEN,
};
