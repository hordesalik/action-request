import http from 'http';
import { expressAppInstance } from '../express-app/express-app.instance.js';

export const httpServerInstance = http.createServer(expressAppInstance);
