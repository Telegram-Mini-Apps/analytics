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
        window.addEventListener('message', ({ data }) => {
            try {
                const { eventType, eventData } = JSON.parse(data);
                this.handleEvents(eventType, eventData);
            } catch(e) {}
          });
        this.handlePlatformListener(window.TelegramGameProxy);
        this.handlePlatformListener(window.Telegram.WebView);
        this.handlePlatformListener(window.TelegramGameProxy_receiveEvent);
    }

    private handlePlatformListener(listener: any) {
        if (!listener) {
            return;
        }

        let originalReceiveEvent: (eventType: string, eventData: unknown) => void;

        if (listener?.receiveEvent) {     
            originalReceiveEvent = listener.receiveEvent;
        } else {
            originalReceiveEvent = listener;
            listener = window;
        }

        const observer = this;

        listener.receiveEvent = (eventType: string, eventData: unknown) => {
            observer.handleEvents(eventType, eventData);

            return originalReceiveEvent.call(listener, eventType, eventData);
        }

    }

    private handleEvents(eventType: string, eventData: Record<string, any>) {
        if (eventType === 'web_app_open_invoice ') {
            this.analyticsController.collectEvent(Events.PURCHASE_INIT, {
                slug: eventData.slug,
            });
        }
    }    
}