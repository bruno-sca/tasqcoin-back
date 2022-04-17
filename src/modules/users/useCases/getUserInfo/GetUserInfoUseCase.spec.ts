import { User } from '@modules/users/infra/typeorm/entities/User';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { GetUserInfoUseCase } from './GetUserInfoUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let getUserInfoUseCase: GetUserInfoUseCase;

let targetUser: User;

describe('GetUserInfoUseCase', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    getUserInfoUseCase = new GetUserInfoUseCase(usersRepositoryInMemory);

    targetUser = await usersRepositoryInMemory.create({
      email: 'test@email.com',
      name: 'Test Name',
      password: 'pass',
    });
  });

  it('Should be able to search user info by id', async () => {
    const resultUser = await getUserInfoUseCase.execute(targetUser.id);

    expect(targetUser).toEqual(resultUser);
  });

  it('Should not be able to get info from a noexistent user', async () => {
    await expect(getUserInfoUseCase.execute('fake_id')).rejects.toEqual(
      new AppError('User not found!')
    );
  });
});
