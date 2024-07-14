import crypto from 'crypto';

const actionRequestsRegistry = new Map();

const ACTION_REQUEST_TTL = 10 * 60 * 1000; // 10 minutes
const ACTION_REQUEST_TOKEN_SIZE = 48; // bytes

function generateRandomToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(ACTION_REQUEST_TOKEN_SIZE, function (err, buffer) {
            if (err) {
                reject(err);
            } else {
                const token = buffer.toString('hex');
                resolve(token);
            }
        });
    })
}

export async function createActionRequest(sessionId, { ttl } = {}) {
    let token;

    do {
        token = await generateRandomToken();
    } while (actionRequestsRegistry.has(token));

    const actionRequestObject = {
        createdAt: Date.now(),
        token,
        ttl: ttl || ACTION_REQUEST_TTL,
        sessionId,
    }

    actionRequestsRegistry.set(token, actionRequestObject);

    setTimeout(() => {
        actionRequestsRegistry.delete(token);
    }, actionRequestObject.ttl);

    console.log('Action Request object is created', actionRequestObject);

    return actionRequestObject;
}

export function getActionRequest(token) {
    return actionRequestsRegistry.get(token);
}

export function removeActionRequest(token) {
    return actionRequestsRegistry.delete(token);
}

export function setActionRequestResult(token, result) {
    const actionRequest = getActionRequest(token);
    if (!actionRequest) {
        throw new Error(`Action Request with token "${token}" not found`);
    }

    actionRequest.result = result;
    return actionRequest;
}
