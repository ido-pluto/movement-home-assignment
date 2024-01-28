import {BeAnObject} from '@typegoose/typegoose/lib/types.js';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {Document, ProjectionType} from 'mongoose';
import {COOKIE_SETTINGS, JWT_SECRET} from '../../config.js';
import AccountModel, {Account, AccountDocument} from '../../database/collection/account.js';

type JWTPayload = { accountId: string };

declare global {
    namespace Express {
        interface Request {
            accountInfo: AccountDocument;
        }
    }
}

const COOKIE_NAME = 'auth-cookie';

export function setJWT(res: Response, payload: JWTPayload) {
    const token = jwt.sign(payload, JWT_SECRET);
    res.cookie(COOKIE_NAME, token, COOKIE_SETTINGS);
}

export async function getJWTData(req: Request): Promise<JWTPayload | void> {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return;

    return await new Promise(res => {
        jwt.verify(token, JWT_SECRET, (err: any, data: any) => {
            if (err) return res(err);
            res(data);
        });
    });
}

export function clearJWT(res: Response) {
    res.clearCookie(COOKIE_NAME);
}

export type AuthRequest = Request & { accountInfo: Document<any, BeAnObject, Account> & Account };
export default function expressAuth(project?: ProjectionType<Account>) {

    return async (req: Request, res: Response, next: Function) => {

        const login = await getJWTData(req);
        const account = login && await AccountModel.findById(login.accountId, project);

        if (account == null || !account.isAdmin) {
            return res.sendStatus(401);
        }

        req.accountInfo = account;
        next();
    };
}
