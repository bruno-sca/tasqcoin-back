import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ChangeUserNameController } from '@modules/users/useCases/changeUserName/ChangeUserNameController';
import { CreateUserController } from '@modules/users/useCases/createUserUseCase/CreateUserController';
import { GetUserInfoController } from '@modules/users/useCases/getUserInfo/GetUserInfoController';
import { SearchUsersController } from '@modules/users/useCases/searchUsers/SearchUsersController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const changeUserNameController = new ChangeUserNameController();
const getUserInfoController = new GetUserInfoController();
const searchUsersController = new SearchUsersController();

userRoutes.post('/', createUserController.handle);
userRoutes.get('/', ensureAuthenticated, getUserInfoController.handle);
userRoutes.get('/search', ensureAuthenticated, searchUsersController.handle);

userRoutes.patch(
  '/change-name',
  ensureAuthenticated,
  changeUserNameController.handle
);

export { userRoutes };
