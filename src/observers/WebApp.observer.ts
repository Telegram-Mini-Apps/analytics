import { AnalyticsController } from "../controllers/Analytics.controller";
import { Events } from "../constants";

export class WebAppObserver {
    private analyticsController: AnalyticsController;

    private webApp = typeof window !== 'undefined' && window?.Telegram?.WebApp
        ? window.Telegram.WebApp
        : null;

    constructor(analyticsController: AnalyticsController) {
        this.analyticsController = analyticsController;
    }

    public init() {
        if (this.webApp && this.webApp.openInvoice) {
            const originalOpenInvoice = this.webApp.openInvoice;

            this.webApp.openInvoice = (url: string, callback: any) => {
                const slug = url.split('/').pop() || '';

                this.analyticsController.collectEvent(Events.PURCHASE_INIT, {
                    slug
                });

                return originalOpenInvoice.call(this.webApp, url, callback);
            };
        }
    }

}