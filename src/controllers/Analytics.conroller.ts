import { UserActionEvent } from '@tonconnect/ui'
import { App } from '../app'
import { Events } from '../constants'

export class AnalyticsController {
    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
        for (let eventType of this.events)  {
            console.log(`ton-connect-ui-${eventType}`);

            window.addEventListener(`ton-connect-ui-${eventType}`, (event: CustomEvent<UserActionEvent>) => {
                console.log(`event ${eventType} received`, event.detail);

                const { type, ...rest } = event.detail;
                this.recordEvent(event.detail.type, { ...rest });
            });
        }
    }

    public recordEvent(event_name: string, data?: any) {
        this.appModule.recordEvent(event_name, data);
    }

    private appModule: App;
    private events: Array<Events> = [
        Events.CUSTOM_EVENT,
        Events.WALLET_CONNECT_STARTED,
        Events.WALLET_CONNECT_SUCCESS,
        Events.WALLET_CONNECT_ERROR,
        Events.CONNECTION_RESTORING_STARTED,
        Events.CONNECTION_RESTORING_SUCCESS,
        Events.CONNECTION_RESTORING_ERROR,
        Events.TRANSACTION_SENT_FOR_SIGNATURE,
        Events.TRANSACTION_SIGNED,
        Events.TRANSACTION_SIGNING_FAILED,
        Events.WALLET_DISCONNECT,
    ]
}
