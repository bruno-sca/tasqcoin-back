import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateFeedbackController } from '@modules/feedback/useCases/createFeedback/CreateFeedbackController';

const feedbackRoutes = Router();

const createFeedbackController = new CreateFeedbackController();

feedbackRoutes.post('/', ensureAuthenticated, createFeedbackController.handle);

export { feedbackRoutes };
