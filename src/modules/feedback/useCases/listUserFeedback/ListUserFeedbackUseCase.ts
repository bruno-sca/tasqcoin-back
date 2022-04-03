import { inject, injectable } from 'tsyringe';

import { Feedback } from '@modules/feedback/infra/typeorm/entities/Feedback';
import { IFeedbacksRepository } from '@modules/feedback/repositories/IFeedbacksRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  page?: number;
  pageSize?: number;
}

interface IResponse {
  feedbacks: Feedback[];
  totalPages: number;
}

@injectable()
class ListUserFeedbackUseCase {
  constructor(
    @inject('FeedbacksRepository')
    private feedbackRepository: IFeedbacksRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    page = 1,
    pageSize = 12,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id).catch(() => {
      throw new AppError('User not found!');
    });

    if (!user) throw new AppError('User not found!');

    const response = await this.feedbackRepository.listByUserId(user_id, {
      page,
      pageSize,
    });

    return response;
  }
}

export { ListUserFeedbackUseCase };