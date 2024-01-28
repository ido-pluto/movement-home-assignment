import {Router} from 'express';
import {validateRequestBody} from 'zod-express-middleware';
import {login, logout, signup} from './auth.controller.js';
import {loginSchema, signupSchema} from './auth.model.js';

const authRouter = Router();
export default authRouter;

authRouter.post('/signup', validateRequestBody(signupSchema), async (req, res) => {
    res.json(
        await signup(req.body, res)
    );
});


authRouter.post('/login', validateRequestBody(loginSchema), async (req, res) => {
    res.json(
        await login(req.body, res)
    );
});

authRouter.post('/logout', (req, res) => {
    res.json(
        logout(res)
    );
});
