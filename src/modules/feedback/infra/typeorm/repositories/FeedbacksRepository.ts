import { getRepository, Repository } from 'typeorm';

import { ICreateFeedbackDTO } from '@modules/feedback/dto/ICreateFeedback';
import { IFeedbacksRepository } from '@modules/feedback/repositories/IFeedbacksRepository';

import { Feedback } from '../entities/Feedback';

class FeedbacksRepository implements IFeedbacksRepository {
  private repository: Repository<Feedback>;

  constructor() {
    this.repository = getRepository(Feedback);
  }

  async create(data: ICreateFeedbackDTO): Promise<Feedback> {
    const feedback = this.repository.create(data);

    await this.repository.save(feedback);

    return feedback;
  }
}

export { FeedbacksRepository };
