import {BATCH_KEY, Events} from "../constants";
import { App } from "../app";
import { BatchStorage } from "../repositories/BatchStorage";

export class BatchService {
    private appModule: App;
    private storage: BatchStorage;
    private backoff: number = 1;
    private intervalId: number | null = null;
    private batchInterval: number = 2000;
    private taskRetry: number = 0;

    private readonly BATCH_KEY: string = BATCH_KEY;

    constructor(appModule: App) {
        this.appModule = appModule;
        this.storage = new BatchStorage(this.BATCH_KEY + '-' + this.appModule.getApiToken());
    }

    public init() {
        if (document.readyState === 'complete') {
            this.startBatchingWithInterval();
        } else {
            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    this.startBatchingWithInterval();
                }
            }
        }
    }

    private startBatchingWithInterval() {
        let counter = 0;
        this.appModule.solveTask();
        this.appModule.collectEvent(Events.INIT);

        if (this.appModule.taskSolution !== undefined) {
            this.startBatching();
        } else {
            const intervalId = setInterval(() => {
                if (this.appModule.taskSolution !== undefined) {
                    this.startBatching();
                    clearInterval(intervalId);
                } else {
                    if (counter++ >= 3) {
                        this.startBatching()
                        clearInterval(intervalId);

                        return;
                    }

                    this.appModule.solveTask();
                }
            }, 1000);
        }
    }

    public stopBatching() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public collect(event_name: string, requestBody?: Record<string, any>) {
        if (document.readyState === 'complete') {
            this.storage.addToStorage(event_name, requestBody);
        } else {
            const onLoad = () => {
                this.storage.addToStorage(event_name, requestBody);
            }

            setTimeout(() => {
                if (document.readyState === 'complete') {
                    onLoad();
                } else {
                    window.addEventListener('load', onLoad)
                }
            }, 0);
        }
    }

    public startBatching() {
        this.appModule.solveTask();
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => this.processQueue(), this.batchInterval);
        }
    }

    private processQueue() {
        const data: Record<string, any>[] = this.storage.getBatch();

        if ((data.length !== 0) && (window.navigator.onLine)) {
            this.sendBatch(data.slice(0,20));
        }
    }

    private sendBatch(batch: Record<string, any>[]) {
        this.stopBatching();
        this.appModule.recordEvents(batch).then((res: Response)=> {
            if (String(res.status) === '429') {
                this.startBatching();

                return;
            }

            if (String(res.status)[0] === '4') {
                return;
            }

            if (String(res.status)[0] === '5') {
                if (this.backoff < 5){
                    this.backoff++;
                    this.batchInterval = this.batchInterval * 2.71;
                    this.startBatching();
                }
                return;
            }

            this.backoff = 1;
            this.batchInterval = 2000;

            if (String(res.status) === '203') {
                this.taskRetry++;

                this.appModule.taskSolution = undefined;

                if (this.taskRetry > 3) {
                    this.startBatching();

                    return;
                } else {
                    this.appModule.solveTask();
                    this.startBatching();

                    return;
                }
            }

            this.taskRetry = 0;
            this.storage.setItem(this.storage.getBatch()
                .filter(cachedEvent =>
                    !batch.some(event =>
                        JSON.stringify(cachedEvent) === JSON.stringify(event)))
            );
            this.startBatching();
        }, (error) => {
            console.log(error);
            this.startBatching();
        });
    }
}