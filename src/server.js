import dotenv from 'dotenv';
import { startSocketIO } from './app/instances/socket-io-instance/socketIo.instance.js';
import { httpServerInstance } from './app/instances/http-server/http-server.instance.js';

if (process.env.NO_DOTENV !== '1') {
    dotenv.config();
}

const port = process.env.HTTP_SERVER_PORT || '80';

startSocketIO(httpServerInstance);

httpServerInstance.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
