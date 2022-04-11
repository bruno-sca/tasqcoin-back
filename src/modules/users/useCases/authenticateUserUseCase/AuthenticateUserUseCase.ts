import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { IUsersRefreshTokensRepository } from '@modules/users/repositories/IUsersRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersRefreshTokensRepository')
    private usersRefreshTokensRepository: IUsersRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email or password!', 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Incorrect email or password!', 401);

    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
    } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersRefreshTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expire_date: this.dateProvider.addDays(
        Number(expires_in_refresh_token.replace(/\D/g, ''))
      ),
    });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
