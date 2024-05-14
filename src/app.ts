import { Events } from './constants'
import { AnalyticsController } from './controllers/Analytics.conroller'
import { NetworkController } from './controllers/Network.controller'
import { SessionController } from './controllers/Session.controller'

export class App {
    constructor(apiToken: string, appName: string) {
        this.sessionController = new SessionController(this);
        this.networkController = new NetworkController(this);
        this.analyticsController = new AnalyticsController(this);
        this.apiToken = apiToken;
        this.appName = appName;
    }

    public async init() {
        this.networkController.init();
        this.sessionController.init();
        this.analyticsController.init();

        await this.networkController.recordEvent(Events.INIT);
    }

    public getSessionId() {
        return this.sessionController.getSessionId();
    }

    public getSaltedUserId() {
        return this.sessionController.getSaltedUserId();
    }

    public recordEvent(
        event_name: string,
        data?: Record<string, string>,
        attributes?: Record<string, string>,
    ) {
        return this.networkController.recordEvent(event_name, attributes);
    }

    public getApiToken() {
        return this.apiToken;
    }

    public getAppName() {
        return this.appName;
    }

    private sessionController: SessionController;
    private networkController: NetworkController;
    private analyticsController: AnalyticsController;

    private apiToken: string;
    private appName: string;
}