import { inject, injectable } from 'tsyringe';

import { Feedback } from '@modules/feedback/infra/typeorm/entities/Feedback';
import { IFeedbacksRepository } from '@modules/feedback/repositories/IFeedbacksRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  amount: number;
  description: string;
  user_from_id: string;
  user_to_id: string;
}

@injectable()
class CreateFeedbackUseCase {
  constructor(
    @inject('FeedbacksRepository')
    private feedbackRepository: IFeedbacksRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    amount,
    description,
    user_from_id,
    user_to_id,
  }: IRequest): Promise<Feedback> {
    const user_from = await await this.usersRepository.findById(user_from_id);

    if (!user_from) throw new AppError('User not found!');

    if (user_from.balance < amount)
      throw new AppError('User balance is too low!');

    const user_to = await this.usersRepository
      .findById(user_to_id)
      .catch((e) => {
        if (String(e.message).includes('invalid input syntax for type uuid:'))
          throw new AppError('User not found!');
        throw new Error(e);
      });

    if (!user_to) throw new AppError('User not found!');

    const feedback = await this.feedbackRepository.create({
      amount,
      description,
      user_from_id: user_from.id,
      user_to_id,
    });

    await this.usersRepository.update({
      ...user_from,
      balance: user_from.balance - amount,
    });

    return feedback;
  }
}

export { CreateFeedbackUseCase };