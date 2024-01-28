import bcrypt from 'bcryptjs';
import {Response} from 'express';
import AccountModel from '../../../database/collection/account.js';
import {clearJWT, setJWT} from '../../middleware/auth.js';
import {Login, Signup} from './auth.model.js';

export async function signup({firstName, lastName, email, password, avatar}: Signup, res: Response) {
    const emailExist = await AccountModel.exists({email});
    if (emailExist) {
        res.statusCode = 409;
        return {error: 'Email already exits in the system'};
    }

    const account = new AccountModel({firstName, lastName, email, avatar, isAdmin: true});

    account.passwordSalt = await bcrypt.genSalt();
    account.passwordHash = await bcrypt.hash(password, account.passwordSalt);

    await account.save();

    setJWT(res, {accountId: account.id});
    return {ok: true};
}

export async function login({email, password}: Login, res: Response) {
    const account = await AccountModel.findOne({email, isAdmin: true}, {passwordHash: true, passwordSalt: true});

    if (account == null) {
        res.statusCode = 404;
        return {error: 'Account not found, make sure you enter the right email'};
    }

    const passwordHash = await bcrypt.hash(password, <string>account.passwordSalt);

    if (account.passwordHash != passwordHash) {
        res.statusCode = 401;
        return {error: 'Password is incorrect'};
    }

    setJWT(res, {accountId: account.id});
    return {ok: true};
}

export function logout(res: Response) {
    clearJWT(res);
    return {ok: true};
}
