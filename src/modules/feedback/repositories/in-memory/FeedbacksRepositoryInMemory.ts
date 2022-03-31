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
}

export { FeedbacksRepositoryInMemory };
