import * as mongoose from 'mongoose';
import {MONGO_URI} from '../config.js';
import {insertIfDBEmpty} from './populateDB.js';

export default async function initDBConnection() {
    await mongoose.set('strictQuery', false).connect(MONGO_URI);
    await insertIfDBEmpty();
}
