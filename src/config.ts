// times
export const DAY_IN_MS = 1000 * 60 * 60 * 24;

//auth
export const JWT_SECRET = process.env.JWT_SECRET || '1234';
export const COOKIE_SETTINGS = {maxAge: DAY_IN_MS * 3, httpOnly: true, sameSite: true};

//db
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-list';

//server
export const HOST = process.env.HOST || 'localhost';
export const HTTPS_PORT = 443;
export const ORIGINS = process.env.ORIGINS?.split(',') || [
    'https://localhost',
    /www\.google\.com$/,
    'https://www.facebook.com'
];
