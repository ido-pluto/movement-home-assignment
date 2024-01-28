import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import {HOST, HTTPS_PORT, ORIGINS} from '../config.js';
import apiRouter from './routes/index.js';
import cors from 'cors';
import selfsigned from 'selfsigned';
import https from 'https';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// cors
app.use(cors({origin: ORIGINS, credentials: true}));
app.options('*', cors({origin: ORIGINS, credentials: true}));

// static files
app.use(express.static('public'));

// api routes
app.use('/api', apiRouter);

export function serverListen() {
    const pems = selfsigned.generate(null!, {days: 365});

    const httpsServer = https.createServer({key: pems.private, cert: pems.cert}, app);
    httpsServer.listen(HTTPS_PORT, HOST,
        () => console.log(`Server listen on https://localhost:${HTTPS_PORT}`)
    );
}
