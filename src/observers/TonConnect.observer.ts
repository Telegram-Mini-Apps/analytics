import { AnalyticsController } from "../controllers/Analytics.controller";
import { Events } from "../constants";
import { SdkActionEvent , UserActionEvent } from "@tonconnect/ui";

export class TonConnectObserver {
    private analyticsController: AnalyticsController;

    private readonly tonConnectSdkEvents: Array<Events> = [
        Events.CUSTOM_EVENT,
        Events.WALLET_CONNECT_SUCCESS,
        Events.WALLET_CONNECT_ERROR,
        // Events.CONNECTION_RESTORING_STARTED,
        Events.CONNECTION_RESTORING_SUCCESS,
        Events.CONNECTION_RESTORING_ERROR,
        Events.TRANSACTION_SENT_FOR_SIGNATURE,
        Events.TRANSACTION_SIGNED,
        Events.TRANSACTION_SIGNING_FAILED,
        Events.WALLET_DISCONNECT,
    ];
    private readonly tonConnectUiEvents: Array<Events> = [
        Events.WALLET_CONNECT_STARTED,
        Events.WALLET_CONNECT_ERROR,
        Events.TRANSACTION_SIGNING_FAILED,
    ];
    private readonly uiScope: string = 'ton-connect-ui-';
    private readonly sdkScope: string = 'ton-connect-';

    constructor(analyticsController: AnalyticsController) {
        this.analyticsController = analyticsController;
    }

    public init() {
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

                    this.analyticsController.collectEvent(
                        event.detail.type,
                        { ...rest },
                    );
                }
            );
        }
    }

    private get events(): string[] {
        const tonConnectUiEvents = this.tonConnectUiEvents.map((event) => `${this.uiScope}${event}`)
        const tonConnectSdkEvents = this.tonConnectSdkEvents.map((event) => `${this.sdkScope}${event}`)
        return [...tonConnectUiEvents, ...tonConnectSdkEvents]
    }
}