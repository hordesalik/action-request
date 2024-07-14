import { Server } from 'socket.io';
import { getSession } from '../../models/sessions/sessions.model.js';

let socketIOInstance;

export function getSocketIOInstance() {
    return socketIOInstance;
}

export function startSocketIO(httpServer) {
    socketIOInstance = new Server(httpServer);

    socketIOInstance.on('connection', (socket) => {
        const sessionId = socket?.handshake?.query?.sessionId;
        const session = getSession(sessionId);
        if (!session) {
            socket.disconnect();
            return;
        }

        session.websocketId = socket.id;

        console.log('user is connected', socket.id);

        socket.on('disconnect', function () {
            console.log('user disconnected', socket.id);
            delete session.websocketId;
        });
    })

    return socketIOInstance;
}
