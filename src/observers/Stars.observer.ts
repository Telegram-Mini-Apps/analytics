import { AnalyticsController } from "../controllers/Analytics.controller";
import { Events } from "../constants";

export class StarsObserver {
    private analyticsController: AnalyticsController;

    private webApp = typeof window !== 'undefined' && window?.Telegram?.WebApp
        ? window.Telegram.WebApp
        : null;
    private webView = typeof window !== 'undefined' && window?.Telegram?.WebView
        ? window.Telegram.WebView
        : null;

    private readonly eventStatusMap = {
        paid: Events.PURCHASE_SUCCESS,
        cancelled: Events.PURCHASE_FAILED,
        failed: Events.PURCHASE_FAILED,
    }

    constructor(analyticsController: AnalyticsController) {
        this.analyticsController = analyticsController;
    }

    public init() {
        if (this.webApp) {
            const originalOpenInvoice = this.webApp.openInvoice;

            this.webApp.openInvoice = (url: string, callback: any) => {
                const slug = url.split('/').pop() || '';

                this.analyticsController.collectEvent(Events.PURCHASE_INIT);

                return originalOpenInvoice.call(this.webApp, url, callback);
            };

            this.webView?.onEvent('invoice_closed', (event: string, data?: {
                url: string;
                status: 'paid' | 'cancelled' | 'failed' | 'pending'
            }) => {
                if (this.eventStatusMap[data.status]) {
                    this.analyticsController.collectEvent(this.eventStatusMap[data.status])
                }
            });
        }
    }

}