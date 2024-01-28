import {serverListen} from './api/server.js';
import initDBConnection from './database/initDB.js';

async function main() {
    await initDBConnection();
    serverListen();
}

main();
