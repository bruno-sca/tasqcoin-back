import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserBalanceUseCase } from './GetUserBalanceUseCase';

class GetUserBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserBalanceUseCase = container.resolve(GetUserBalanceUseCase);

    const balance = await getUserBalanceUseCase.execute(id);

    return response.status(200).json(balance);
  }
}

export { GetUserBalanceController };
