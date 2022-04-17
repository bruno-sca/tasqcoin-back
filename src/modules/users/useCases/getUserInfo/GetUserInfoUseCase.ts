import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GetUserInfoUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id).catch(() => {
      throw new AppError('User not found!');
    });

    if (!user) throw new AppError('User not found!');

    delete user.password;

    return user;
  }
}

export { GetUserInfoUseCase };
