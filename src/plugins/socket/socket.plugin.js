import clientConfig from 'src/client.config.json';
import { Socket as PhoenixSocket } from 'phoenix';

const socketUrl = clientConfig.socketRoot;

const socketInstance = new PhoenixSocket(socketUrl, {
    logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
    },
});

export const Socket = {
    connect(token, silent = false) {
        if (this.connClosed()) {
            socketInstance.params.token = token;
            socketInstance.connect();
            console.log('Socket connected!');
        } else if (!this.connAvaiable()) {
            socketInstance.connect();
            console.log('Socket reconnected!');
        } else if (!silent) {
            console.warn('Tried to connect a connected socket.');
        }
    },

    disconnect() {
        if (this.connClosed()) {
            return;
        }
        socketInstance.disconnect(() => {
            socketInstance.reconnectTimer.reset();
            console.log('Socket disconnected!');
        });
    },

    connAvaiable() {
        return socketInstance && (socketInstance.connectionState() === 'open' ||
            socketInstance.connectionState() === 'connecting');
    },

    connClosed() {
        return socketInstance.connectionState() === 'closed';
    },

};

// receive connection and params by options
// https://vuejs.org/v2/guide/plugins.html
export default function install(Vue) {
    Object.defineProperty(Vue.prototype, '$socket', {
        get() {
            return socketInstance;
        },
    });
}
