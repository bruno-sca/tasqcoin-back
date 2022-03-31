import { ICreateFeedbackDTO } from '../dto/ICreateFeedback';
import { Feedback } from '../infra/typeorm/entities/Feedback';

interface IFeedbacksRepository {
  create(data: ICreateFeedbackDTO): Promise<Feedback>;
}

export { IFeedbacksRepository };
