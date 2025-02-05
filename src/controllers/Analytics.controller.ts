import { App } from '../app'
import { TonConnectObserver } from "../observers/TonConnect.observer";
import { DocumentObserver } from "../observers/Document.observer";
import { BACKEND_URL } from "../constants";

export class AnalyticsController {
    private appModule: App;
    private tonConnectObserver: TonConnectObserver;
    private documentObserver: DocumentObserver;

    private eventsThreshold: Record<string, number>

    constructor(app: App) {
        this.appModule = app;

        this.documentObserver = new DocumentObserver(this);
        this.tonConnectObserver = new TonConnectObserver(this);
    }

    public async init() {
        this.documentObserver.init();
        this.tonConnectObserver.init();

        this.eventsThreshold = await (await fetch(BACKEND_URL + 'events/threshold')).json();
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
}
