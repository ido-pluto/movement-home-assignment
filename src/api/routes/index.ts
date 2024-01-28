import {Router} from 'express';
import usersRouter from './account/user.js';
import authRouter from './account/auth.js';

const apiRouter = Router();
export default apiRouter;

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', usersRouter);
