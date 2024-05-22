import {AnalyticsController} from "../controllers/Analytics.controller";
import {Events} from "../constants";

export class DocumentObserver {
    constructor(analyticsController: AnalyticsController) {
        this.analyticsController = analyticsController;
    }

    public init() {
        for (let [event, callback] of Object.entries(this.documentEvents)) {
            document.addEventListener(event, callback);
        }
    }

    private analyticsController: AnalyticsController;

    private documentEvents: Record<string, (event?: Event) => void> = {
        'visibilitychange': () => {
            if (document.visibilityState === 'hidden'){
                this.analyticsController.recordEvent(Events.HIDE)
            }
        },
    }
}