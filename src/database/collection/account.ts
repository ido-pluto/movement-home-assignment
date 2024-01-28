import {getModelForClass, prop} from '@typegoose/typegoose';
import {BeAnObject} from '@typegoose/typegoose/lib/types.js';
import {Document} from 'mongoose';

export class Account {
    @prop({unique: true})
    public email!: string;

    @prop()
    public firstName?: string;

    @prop()
    public lastName?: string;

    @prop()
    public avatar?: string;

    @prop()
    public passwordHash?: string;

    @prop()
    public passwordSalt?: string;

    @prop()
    public isAdmin?: boolean;
}

const AccountModel = getModelForClass(Account);
export default AccountModel;

export type AccountDocument = Document<any, BeAnObject, Account> & Account;
