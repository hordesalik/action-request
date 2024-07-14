import { Router } from 'express';
import { createSession } from '../../../models/sessions/sessions.model.js';

export const sessionsRouter = Router();

sessionsRouter.post('/',
    async (req, res) => {
        try {
            const session = await createSession();
            res.json(session);
        } catch (e) {
            res.status(500);
            res.json({ error: e.message });
        }
    }
);
