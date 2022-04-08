import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ChangeUserNameController } from '@modules/users/useCases/changeUserName/ChangeUserNameController';
import { CreateUserController } from '@modules/users/useCases/createUserUseCase/CreateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const changeUserNameController = new ChangeUserNameController();

userRoutes.post('/', createUserController.handle);

userRoutes.patch(
  '/change-name',
  ensureAuthenticated,
  changeUserNameController.handle
);

export { userRoutes };
