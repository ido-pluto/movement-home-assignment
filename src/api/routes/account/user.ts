import {Router} from 'express';
import {validateRequest, validateRequestBody, validateRequestParams} from 'zod-express-middleware';
import expressAuth from '../../middleware/auth.js';
import fetchUser from '../../middleware/fetchUser.js';
import {createUser, deleteUser, getUser, getUsers, updateGeneralInfo} from './user.controller.js';
import {pageNumberParam, userGeneralInfoSchema, userIdParam} from './user.model.js';

const usersRouter = Router()
    .use(expressAuth());
export default usersRouter;

usersRouter.post('/createUser', validateRequestBody(userGeneralInfoSchema), async (req, res) => {
    res.json(
        await createUser(req.body, res)
    );
});

usersRouter.get('/getUsers/:page', validateRequestParams(pageNumberParam), async (req, res) => {
    res.json(
        await getUsers(Number(req.params.page))
    );
});

usersRouter.get('/getUser/:id', validateRequestParams(userIdParam), fetchUser({param: 'id'}), async (req, res) => {
    res.json(
        await getUser(req.fetchedAccount)
    );
});

usersRouter.put('/updateUser/:id', validateRequest({params: userIdParam, body: userGeneralInfoSchema}), fetchUser({param: 'id'}), async (req, res) => {
    res.json(
        await updateGeneralInfo(req.fetchedAccount, req.body, res)
    );
});

usersRouter.delete('/deleteUser/:id', validateRequestParams(userIdParam), fetchUser({param: 'id'}), async (req, res) => {
    res.json(
        await deleteUser(req.fetchedAccount)
    );
});
