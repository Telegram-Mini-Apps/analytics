export const BACKEND_URL: string = 'https://tganalytics.xyz/'

export const enum Events {
    INIT = 'app-init',
    CUSTOM_EVENT = 'custom-event',
    WALLET_CONNECT_STARTED = 'wallet-connect-started',
    WALLET_CONNECT_SUCCESS = 'wallet-connect-success',
    WALLET_CONNECT_ERROR = 'wallet-connect-error',
    CONNECTION_RESTORING_STARTED = 'connection-restoring-started',
    CONNECTION_RESTORING_SUCCESS = 'connection-restoring-success',
    CONNECTION_RESTORING_ERROR = 'connection-restoring-error',
    TRANSACTION_SENT_FOR_SIGNATURE = 'transaction-sent-for-signature',
    TRANSACTION_SIGNED = 'transaction-signed',
    TRANSACTION_SIGNING_FAILED = 'transaction-signing-failed',
    WALLET_DISCONNECT = 'wallet-disconnect'
}
