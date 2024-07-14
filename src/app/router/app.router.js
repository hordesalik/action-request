import { Router } from 'express';
import { sessionsRouter } from './routes/sessions/session.router.js';
import { actionRequestRouter } from './routes/actionRequest/actionRequest.router.js';

export const appRouter = new Router();

appRouter.use('/sessions', [
    sessionsRouter,
]);
appRouter.use('/action-request', [
    actionRequestRouter,
]);
