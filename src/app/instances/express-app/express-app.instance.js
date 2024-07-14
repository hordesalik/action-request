import express from 'express';
import { appRouter } from '../../router/app.router.js';

export const expressAppInstance = express();

expressAppInstance.use(appRouter);
