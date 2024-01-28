import {Request, Response} from 'express';
import AccountModel, {Account, AccountDocument} from '../../database/collection/account.js';
import {ProjectionType} from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            fetchedAccount: AccountDocument;
        }
    }
}

export default function fetchUser({param}: { param: string }, projection?: ProjectionType<Account>) {
    return async (req: Request, res: Response, next: Function) => {
        const account = await AccountModel.findById(req.params[param], projection);
        if (account) {
            req.fetchedAccount = account;
            next();
        } else {
            res.status(404).json({error: 'Account not found'});
        }
    };
}
