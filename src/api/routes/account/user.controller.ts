import {Response} from 'express';
import AccountModel, {AccountDocument} from '../../../database/collection/account.js';
import {UserGeneralInfo} from './user.model.js';

const FETCH_PAGE_LIMIT = 10;

export async function createUser(user: UserGeneralInfo, res: Response) {
    const emailExist = await AccountModel.exists({email: user.email});
    if (emailExist) {
        res.statusCode = 409;
        return {error: 'Email already exits in the system'};
    }

    const account = new AccountModel(user);
    await account.save();

    return {ok: true, id: account.id};
}

export async function getUsers(page: number) {
    const userPage = await AccountModel.find({}, {email: 1, firstName: 1, lastName: 1, avatar: 1})
        .skip(page * FETCH_PAGE_LIMIT)
        .limit(FETCH_PAGE_LIMIT)
        .lean();

    return userPage;
}

export async function getUser(user: AccountDocument) {
    return {
        _id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
    };
}

export async function updateGeneralInfo(userAccount: AccountDocument, update: UserGeneralInfo, res: Response) {
    if (userAccount.email != update.email) {
        const emailExist = await AccountModel.exists({email: update.email});
        if (emailExist) {
            res.statusCode = 409;
            return {error: 'Email already exits in the system'};
        }

        userAccount.email = update.email!;
    }

    userAccount.firstName = update.firstName;
    userAccount.lastName = update.lastName;
    userAccount.avatar = update.avatar;

    await userAccount.save();

    return {ok: true};
}

export async function deleteUser(userAccount: AccountDocument) {
    await userAccount.delete();
    return {ok: true};
}
