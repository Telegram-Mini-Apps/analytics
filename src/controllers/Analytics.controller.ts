import { App } from '../app'
import { TonConnectObserver } from "../observers/TonConnect.observer";
import { DocumentObserver } from "../observers/Document.observer";
import {BACKEND_URL, STAGING_BACKEND_URL} from "../constants";
import { TappsObserver } from "../observers/tapps/Tapps.observer";

export class AnalyticsController {
    private appModule: App;
    private tonConnectObserver: TonConnectObserver;
    private documentObserver: DocumentObserver;
    private tappsObserver: TappsObserver;

    private eventsThreshold: Record<string, number>

    constructor(app: App) {
        this.appModule = app;

        this.documentObserver = new DocumentObserver(this);
        this.tonConnectObserver = new TonConnectObserver(this);
        this.tappsObserver = new TappsObserver(this);
    }

    public async init() {
        this.documentObserver.init();
        this.tonConnectObserver.init();
        this.tappsObserver.init()

        try {
            this.eventsThreshold = await (
                await fetch(
                    (this.appModule.env === 'STG' ? STAGING_BACKEND_URL : BACKEND_URL) + 'events/threshold',
                    {
                        signal: AbortSignal.timeout(2000),
                    }
                )
            ).json();
        } catch (e) {
            this.eventsThreshold = {
                'app-hide': 3,
            };
        }

    }

    public recordEvent(event_name: string, data?: Record<string, any>) {
        this.appModule.recordEvent(event_name, data).catch(e => console.error(e));
    }

    public collectEvent(event_name: string, data?: Record<string, any>) {
        if (this.eventsThreshold[event_name] === 0) {
            return;
        }

        this.appModule.collectEvent(event_name, data);

        if (this.eventsThreshold[event_name]) {
            this.eventsThreshold[event_name]--;
        }
    }

    public collectTappsEvent(event_name: string, data?: Record<string, any>) {
        this.appModule.collectTappsEvent(event_name, data);
    }
}
