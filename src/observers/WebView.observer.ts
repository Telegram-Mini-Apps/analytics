import { AnalyticsController } from "../controllers/Analytics.controller";
import { Events } from "../constants";

export class WebViewObserver {
    private analyticsController: AnalyticsController;

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
        if (this.webView) {
            this.webView?.onEvent('invoice_closed', (event: string, data?: {
                url: string;
                status: 'paid' | 'cancelled' | 'failed' | 'pending'
            }) => {
                if (this.eventStatusMap[data.status]) {
                    const slug = data?.url.split('/').pop() || '';

                    this.analyticsController.collectEvent(this.eventStatusMap[data.status], {
                        slug
                    });
                }
            });
        }
    }

}