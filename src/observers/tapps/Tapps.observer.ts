import {AnalyticsController} from "../../controllers/Analytics.controller";
import {Events} from "../../constants";
import {AdditionalTaskEvent} from "./tapps";

export class TappsObserver {
    private analyticsController: AnalyticsController;

    private readonly telegramAppsCenterEvents: Array<Events> = [
        Events.ADDITIONAL_TASK_EVENT
    ];

    constructor(analyticsController: AnalyticsController) {
        this.analyticsController = analyticsController;
    }

    public init() {
        for (let eventType of this.telegramAppsCenterEvents)  {
            console.log(`Attach ${eventType} listener`);

            window.addEventListener(
                eventType,
                (event: CustomEvent<AdditionalTaskEvent>) => {
                    console.log(`event ${eventType} received`, event.detail);

                    const {
                        type,
                        ...rest
                    } = event.detail;

                    this.analyticsController.collectTappsEvent(
                        event.detail.type,
                        { ...rest },
                    );
                }
            );
        }
    }
}