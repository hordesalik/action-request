import { Router, json } from 'express';
import { createActionRequest, setActionRequestResult } from '../../../models/actionRequest/actionRequest.model.js';
import { getSession } from '../../../models/sessions/sessions.model.js';
import { getSocketIOInstance } from '../../../instances/socket-io-instance/socketIo.instance.js';
import { sendShortTimeCodeMessage } from '../../../models/shortTimeCode/shortTimeCode.model.js';

export const actionRequestRouter = Router();

actionRequestRouter.post('/:token',
    json(),
    async (req, res) => {
        const { token } = req.params;
        const { result } = req.body;

        try {
            const actionRequest = setActionRequestResult(token, result);
            const session = getSession(actionRequest.sessionId);
            if (session.websocketId) {
                const messageData = {
                    type: 'actionRequestUpdate',
                    actionRequest,
                };
                getSocketIOInstance()?.to(session.websocketId).emit('message', messageData);
                console.log(`Message sent to websocket ${session.websocketId}`, messageData);
            } else {
                console.log('Could not notify a requester, websocket is not available');
            }

            res.json({
                success: true,
            });
        } catch (e) {
            res.status(500);
            res.json({ error: e.message });
        }
    }
);

actionRequestRouter.post('/',
    json(),
    async (req, res) => {
        const { sessionId, data, shortTimeCode } = req.body;
        try {
            const actionRequestObject = await createActionRequest(sessionId);
            const messageData = {
                token: actionRequestObject.token,
                data: data
            }
            const shortTimeCodeMessageResponse = await sendShortTimeCodeMessage(shortTimeCode, messageData);

            res.json({
                actionRequestObject,
                shortTimeCodeMessageResponse,
            });

            console.log('Action Request is created and sent', {
                actionRequestObject,
                shortTimeCodeMessageResponse,
            });
        } catch (e) {
            res.status(500);
            res.json({ error: e.message });
        }
    }
);
