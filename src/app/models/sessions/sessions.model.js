import crypto from 'crypto';

const sessionsRegistry = new Map();

export function createSession() {
    const id = crypto.randomUUID();
    const session = {
        id
    };
    sessionsRegistry.set(id, session);
    return session;
}

export function destroySession(sessionId) {
    sessionsRegistry.delete(sessionId);
}

export function getSession(sessionId) {
    return sessionsRegistry.get(sessionId);
}
