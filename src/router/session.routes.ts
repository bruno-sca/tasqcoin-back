import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUserUseCase/AuthenticateUserController';

const sessionRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionRoutes.post('/signin', authenticateUserController.handle);

export { sessionRoutes };
