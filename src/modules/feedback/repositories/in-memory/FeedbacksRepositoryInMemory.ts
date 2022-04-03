import { ICreateFeedbackDTO } from '@modules/feedback/dto/ICreateFeedback';
import { Feedback } from '@modules/feedback/infra/typeorm/entities/Feedback';

import { IFeedbacksRepository } from '../IFeedbacksRepository';

class FeedbacksRepositoryInMemory implements IFeedbacksRepository {
  feedbacks: Feedback[] = [];

  async create(data: ICreateFeedbackDTO): Promise<Feedback> {
    const feedback = new Feedback();

    Object.assign(feedback, data);

    this.feedbacks.push(feedback);

    return feedback;
  }

  async listByUserId(
    user_id: string,
    paginationOptions?: PaginationOptions
  ): Promise<{ feedbacks: Feedback[]; totalPages: number }> {
    const pageSize = paginationOptions.pageSize || 12;
    const user_feedbacks = [...this.feedbacks].filter(
      ({ user_to_id, user_from_id }) =>
        [user_from_id, user_to_id].includes(user_id)
    );

    const start = ((paginationOptions.page || 1) - 1) * pageSize;
    const end = Math.min(
      this.feedbacks.length,
      (paginationOptions.page || 1) * pageSize
    );

    const feedbacks = user_feedbacks.slice(start, end);

    return {
      feedbacks,
      totalPages: Math.ceil(user_feedbacks.length / pageSize),
    };
  }
}

export { FeedbacksRepositoryInMemory };
