import { ICreateFeedbackDTO } from '../dto/ICreateFeedback';
import { IRankingEntrieDTO } from '../dto/IRankingEntrie';
import { Feedback } from '../infra/typeorm/entities/Feedback';

interface IFeedbacksRepository {
  create(data: ICreateFeedbackDTO): Promise<Feedback>;
  listByUserId(
    user_id: string,
    paginationOptions?: PaginationOptions
  ): Promise<{ feedbacks: Feedback[]; totalPages: number }>;
  getUserBalance(
    user_id: string,
    start_date: Date,
    end_date: Date
  ): Promise<number>;
  getUsersRanking(
    start_date: Date,
    end_date: Date
  ): Promise<IRankingEntrieDTO[]>;
}

export { IFeedbacksRepository };
