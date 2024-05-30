import { Events } from './constants'
import { AnalyticsController } from './controllers/Analytics.controller'
import { NetworkController } from './controllers/Network.controller'
import { SessionController } from './controllers/Session.controller'
import {BatchController} from "./controllers/Batch.controller";

export class App {
    constructor(apiToken: string, appName: string) {
        this.sessionController = new SessionController(this);
        this.networkController = new NetworkController(this);
        this.analyticsController = new AnalyticsController(this);
        this.batchController = new BatchController(this);
        this.apiToken = apiToken;
        this.appName = appName;
    }

    public async init() {
        this.networkController.init();
        this.sessionController.init();
        this.analyticsController.init();
        this.batchController.init();

        await this.networkController.recordEvent(Events.INIT);
    }

    public getSessionId() {
        return this.sessionController.getSessionId();
    }

    public getUserId() {
        return this.sessionController.getUserId();
    }

    public getWebAppStartParam() {
        return this.sessionController.getWebAppStartParam();
    }

    public getUserLocale() {
        return this.sessionController.getUserLocale();
    }

    public getPlatform(){
        return this.sessionController.getPlatform();
    }

    public assembleEventSession() {
        return {
            session_id: this.getSessionId(),
            user_id: this.getUserId(),
            app_name: this.getAppName(),
            is_premium: this.getUserIsPremium(),
            platform: this.getPlatform(),
            locale: this.getUserLocale(),
            start_param: this.getWebAppStartParam(),
            client_timestamp: String(Date.now()),
        }
    }

    public recordEvent(
        event_name: string,
        data?: Record<string, any>,
        attributes?: Record<string, any>,
    ) {
        return this.networkController.recordEvent(event_name, data, attributes);
    }

    public recordManyEvents(
        data: Record<string, any>[],
    ) {
        return this.networkController.recordManyEvents(data);
    }

    public addToQueue(event_name: string, requestBody?: Record<string, any>){
        this.batchController.addToQueue(event_name, {
            ...requestBody,
            ...this.assembleEventSession(),
        })
    }

    public getApiToken() {
        return this.apiToken;
    }

    public getAppName() {
        return this.appName;
    }

    public getUserIsPremium() {
        const userData = this.sessionController.getUserData();

        return Boolean(userData?.is_premium);
    }

    private sessionController: SessionController;
    private networkController: NetworkController;
    private analyticsController: AnalyticsController;
    private batchController: BatchController;

    private readonly apiToken: string;
    private readonly appName: string;
}
