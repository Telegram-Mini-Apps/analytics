export const BACKEND_URL: string = 'https://test.tganalytics.xyz/';
export const BATCH_KEY: string = 'TGA-Batch-Requests';

export const enum Events {
    INIT = 'app-init',
    HIDE = 'app-hide',
    CUSTOM_EVENT = 'custom-event',
    WALLET_CONNECT_STARTED = 'connection-started',
    WALLET_CONNECT_SUCCESS = 'connection-completed',
    WALLET_CONNECT_ERROR = 'connection-error',
    CONNECTION_RESTORING_STARTED = 'connection-restoring-started',
    CONNECTION_RESTORING_SUCCESS = 'connection-restoring-completed',
    CONNECTION_RESTORING_ERROR = 'connection-restoring-error',
    TRANSACTION_SENT_FOR_SIGNATURE = 'transaction-sent-for-signature',
    TRANSACTION_SIGNED = 'transaction-signed',
    TRANSACTION_SIGNING_FAILED = 'transaction-signing-failed',
    WALLET_DISCONNECT = 'disconnection'
}
