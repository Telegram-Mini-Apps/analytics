import { UserActionEvent, SdkActionEvent } from '@tonconnect/ui'
import { App } from '../app'
import { Events } from '../constants'

export class AnalyticsController {
    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
        for (let [event, callback] of Object.entries(this.documentEvents)) {
            document.addEventListener(event, callback);
        }

        for (let eventType of this.events)  {
            console.log(`Attach ${eventType} listener`);

            window.addEventListener(
                eventType,
                (event: CustomEvent<UserActionEvent | SdkActionEvent>) => {
                console.log(`event ${eventType} received`, event.detail);

                    const {
                        type,
                        ...rest
                    } = event.detail;

                    this.recordEvent(
                        event.detail.type,
                        { ...rest },
                    );
                }
            );
        }
    }

    public recordEvent(event_name: string, data?: any) {
        this.appModule.recordEvent(event_name, data).catch(e => console.error(e));
    }

    private appModule: App;
    private tonConnectSdkEvents: Array<Events> = [
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
    private tonConnectUiEvents: Array<Events> = [
        Events.WALLET_CONNECT_ERROR,
        Events.TRANSACTION_SIGNING_FAILED,
    ]
    private documentEvents: Record<string, (event?: Event) => void> = {
        'visibilitychange': () => {
            if (document.visibilityState === 'hidden'){
                this.recordEvent(Events.HIDE)
            }
        },
    }
    private uiScope: string = 'ton-connect-ui-'
    private sdkScope: string = 'ton-connect-'
    private get events(): string[] {
        const tonConnectUiEvents = this.tonConnectUiEvents.map((event) => `${this.uiScope}${event}`)
        const tonConnectSdkEvents = this.tonConnectSdkEvents.map((event) => `${this.sdkScope}${event}`)
        return [...tonConnectUiEvents, ...tonConnectSdkEvents]
    }
}
