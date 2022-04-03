import { getRepository, Repository } from 'typeorm';

import { ICreateFeedbackDTO } from '@modules/feedback/dto/ICreateFeedback';
import { IFeedbacksRepository } from '@modules/feedback/repositories/IFeedbacksRepository';
import { paginationOptionsToQueryOptions } from '@utils/pagination';

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

  async listByUserId(
    user_id: string,
    paginationOptions?: PaginationOptions
  ): Promise<{ feedbacks: Feedback[]; totalPages: number }> {
    const defaultOptions = {
      pageSize: 12,
    };
    const options = paginationOptionsToQueryOptions({
      ...defaultOptions,
      ...paginationOptions,
    });

    const [feedbacks, totalEntries] = await this.repository.findAndCount({
      where: [{ user_from_id: user_id }, { user_to_id: user_id }],
      ...options,
    });

    return { feedbacks, totalPages: Math.ceil(totalEntries / options.take) };
  }

  async getUserBalance(
    user_id: string,
    start_date: Date,
    end_date: Date
  ): Promise<number> {
    const [{ sum }] = await this.repository
      .createQueryBuilder('f')
      .select('SUM(f.amount)', 'sum')
      .andWhere('f.user_to_id = :id', { id: user_id })
      .andWhere('f.created_at BETWEEN :start AND :end', {
        start: start_date,
        end: end_date,
      })
      .execute();

    return Number(sum);
  }
}

export { FeedbacksRepository };
