import { Events } from './constants'
import { NetworkController } from './controllers/Network.controller'
import { SessionController } from './controllers/Session.controller'

export class App {
    constructor(apiToken: string, appName: string) {
        this.sessionController = new SessionController(this);
        this.networkController = new NetworkController(this);
        this.apiToken = apiToken;
        this.appName = appName;
    }

    public async init() {
        this.networkController.init();
        this.sessionController.init();

        await this.networkController.recordEvent(Events.INIT);
    }

    public getSessionId() {
        return this.sessionController.getSessionId();
    }

    public getSaltedUserId() {
        return this.sessionController.getSaltedUserId();
    }

    public getApiToken() {
        return this.apiToken;
    }

    public getAppName() {
        return this.appName;
    }

    private sessionController: SessionController;
    private networkController: NetworkController;

    private apiToken: string;
    private appName: string;
}
