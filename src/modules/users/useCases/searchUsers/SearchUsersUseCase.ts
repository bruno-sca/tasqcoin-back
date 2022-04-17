import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
class SearchUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(name: string): Promise<User[]> {
    const users = await this.usersRepository.searchUsers(name);

    // eslint-disable-next-line no-param-reassign
    users.forEach((user) => delete user.password);

    return users;
  }
}

export { SearchUsersUseCase };
