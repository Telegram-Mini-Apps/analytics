import { AnalyticsController } from "../controllers/Analytics.controller";
import {Events} from "../constants";

export class CustomEventObserver {
    private analyticsController: AnalyticsController;

    constructor(analyticsController: AnalyticsController) {
        this.analyticsController = analyticsController;
    }

    public init() {
            console.log(`Attach analytics custom event listener`);

            window.addEventListener(
                Events.ANALYTICS_CUSTOM_EVENT,
                (event: CustomEvent<Record<string, any> & {
                    type: string,
                }>) => {
                    const {
                        type,
                        ...rest
                    } = event.detail;

                    if (type === undefined) {
                        console.warn('A custom event was received without the type field.')

                        return;
                    }

                    console.log(`Custom event received`, event.detail);

                    this.analyticsController.collectEvent(
                        'custom-event',
                        { custom_data: {...event.detail} },
                    );
                }
            );
        }
}