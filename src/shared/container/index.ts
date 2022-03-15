import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRefreshTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersRefreshTokensRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRefreshTokensRepository } from '@modules/users/repositories/IUsersRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersRefreshTokensRepository>(
  'UsersRefreshTokensRepository',
  UsersRefreshTokensRepository
);
