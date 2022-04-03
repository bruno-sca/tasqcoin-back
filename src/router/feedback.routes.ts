import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateFeedbackController } from '@modules/feedback/useCases/createFeedback/CreateFeedbackController';
import { GetUserBalanceController } from '@modules/feedback/useCases/getUserBalance/GetUserBalanceController';
import { ListUserFeedbackController } from '@modules/feedback/useCases/listUserFeedback/ListUserFeedbackController';

const feedbackRoutes = Router();

const createFeedbackController = new CreateFeedbackController();
const listUserFeedbackController = new ListUserFeedbackController();
const getUserBalanceController = new GetUserBalanceController();

feedbackRoutes.get('/', ensureAuthenticated, listUserFeedbackController.handle);
feedbackRoutes.post('/', ensureAuthenticated, createFeedbackController.handle);

feedbackRoutes.get(
  '/balance/:id',
  ensureAuthenticated,
  getUserBalanceController.handle
);

export { feedbackRoutes };
