import { App } from '../app'
import { TonConnectObserver } from "../observers/TonConnect.observer";
import { DocumentObserver } from "../observers/Document.observer";
import { TappsObserver } from "../observers/tapps/Tapps.observer";

export class AnalyticsController {
    private appModule: App;
    private tonConnectObserver: TonConnectObserver;
    private documentObserver: DocumentObserver;
    private tappsObserver: TappsObserver;

    constructor(app: App) {
        this.appModule = app;

        this.documentObserver = new DocumentObserver(this);
        this.tonConnectObserver = new TonConnectObserver(this);
        this.tappsObserver = new TappsObserver(this);
    }

    public init() {
        this.documentObserver.init();
        this.tonConnectObserver.init();
        this.tappsObserver.init()
    }

    public recordEvent(event_name: string, data?: Record<string, any>) {
        this.appModule.recordEvent(event_name, data).catch(e => console.error(e));
    }

    public collectEvent(event_name: string, data?: Record<string, any>) {
        this.appModule.collectEvent(event_name, data);
    }

    public collectTappsEvent(event_name: string, data?: Record<string, any>) {
        this.appModule.collectTappsEvent(event_name, data);
    }
}
