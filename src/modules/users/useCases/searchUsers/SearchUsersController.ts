import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchUsersUseCase } from './SearchUsersUseCase';

class SearchUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const name = String(request.query.name || '');

    const searchUsersUseCase = container.resolve(SearchUsersUseCase);

    const users = await searchUsersUseCase.execute(name);

    return response.json(users);
  }
}

export { SearchUsersController };
