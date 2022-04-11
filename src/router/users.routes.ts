import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ChangeUserNameController } from '@modules/users/useCases/changeUserName/ChangeUserNameController';
import { CreateUserController } from '@modules/users/useCases/createUserUseCase/CreateUserController';
import { GetUserInfoController } from '@modules/users/useCases/getUserInfo/GetUserInfoController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const changeUserNameController = new ChangeUserNameController();
const getUserInfoController = new GetUserInfoController();

userRoutes.post('/', createUserController.handle);
userRoutes.get('/', getUserInfoController.handle);

userRoutes.patch(
  '/change-name',
  ensureAuthenticated,
  changeUserNameController.handle
);

export { userRoutes };
