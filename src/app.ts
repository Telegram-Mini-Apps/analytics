import { AnalyticsController } from './controllers/Analytics.controller'
import { NetworkController } from './controllers/Network.controller'
import { SessionController } from './controllers/Session.controller'
import { BatchService } from "./services/Batch.service";
import {HumanProofService} from "./services/HumanProof.service";

export class App {
    private sessionController: SessionController;
    private networkController: NetworkController;
    private analyticsController: AnalyticsController;
    private batchService: BatchService;
    private humanProofService: HumanProofService;

    private readonly apiToken: string;
    private readonly appName: string;

    public taskParams: string;
    public taskSolution: string | undefined;

    constructor(apiToken: string, appName: string) {
        this.apiToken = apiToken;
        this.appName = appName;
        this.humanProofService = new HumanProofService(this);
        this.sessionController = new SessionController(this);
        this.networkController = new NetworkController(this);
        this.analyticsController = new AnalyticsController(this);
        this.batchService = new BatchService(this);
    }

    public async init() {
        this.sessionController.init();
        this.analyticsController.init();
        await this.humanProofService.init().then(() => {
            this.solveTask();
        }).catch(e => console.error(e));
        this.networkController.init();
        this.batchService.init();
    }

    public assembleEventSession() {
        return this.sessionController.assembleEventSession();
    }

    public recordEvent(
        event_name: string,
        data?: Record<string, any>,
        attributes?: Record<string, any>,
    ) {
        return this.networkController.recordEvent(event_name, data, attributes);
    }

    public recordEvents(
        data: Record<string, any>[],
    ) {
        return this.networkController.recordEvents(data);
    }

    public collectEvent(event_name: string, requestBody?: Record<string, any>){
        this.batchService.collect(event_name, {
            ...requestBody,
            ...this.assembleEventSession(),
        });
    }

    public collectTappsEvent(event_name: string, requestBody?: Record<string, any>){
        this.batchService.collect(event_name, {
            ...requestBody,
            ...this.sessionController.assembleEventSession(),
            custom_data: this.sessionController.getUserData(),
        });
    }

    public getApiToken() {
        return this.apiToken;
    }

    public getAppName() {
        return this.appName;
    }

    public solveTask() {
        this.humanProofService.solveTask();
    }

    public setNewArgs(data: string) {
        this.humanProofService.setNewArgs(data);
    }
}
