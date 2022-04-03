import { ICreateFeedbackDTO } from '../dto/ICreateFeedback';
import { Feedback } from '../infra/typeorm/entities/Feedback';

interface IFeedbacksRepository {
  create(data: ICreateFeedbackDTO): Promise<Feedback>;
  listByUserId(
    user_id: string,
    paginationOptions?: PaginationOptions
  ): Promise<{ feedbacks: Feedback[]; totalPages: number }>;
}

export { IFeedbacksRepository };
