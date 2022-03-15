import { Router } from 'express';

import { sessionRoutes } from './session.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use('/users', userRoutes);
router.use(sessionRoutes);

export { router };
