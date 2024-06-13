import {BATCH_KEY, Events} from "../constants";
import { App } from "../app";
import { BatchStorage } from "../repositories/BatchStorage";

export class BatchService {
    private appModule: App;
    private storage: BatchStorage;
    private backoff: number = 1;
    private intervalId: number | null = null;
    private batchInterval: number = 2000;

    private readonly BATCH_KEY: string = BATCH_KEY;

    constructor(appModule: App) {
        this.appModule = appModule;
        this.storage = new BatchStorage(this.BATCH_KEY + '-' + this.appModule.getApiToken());
    }

    public init() {
        if (document.readyState !== 'loading') {
            this.appModule.collectEvent(Events.INIT);
            this.startBatching();
        } else{
            document.addEventListener('DOMContentLoaded', () => {
                this.appModule.collectEvent(Events.INIT);
                this.startBatching();
            });
        }
    }

    public stopBatching() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public collect(event_name: string, requestBody?: Record<string, any>) {
        this.storage.addToStorage(event_name, requestBody);
    }

    public startBatching() {
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
            if (String(res.status)[0] === '4') {
                return;
            }

            if (String(res.status)[0] === '5') {
                if (this.backoff < 5){
                    this.backoff++;
                    this.batchInterval = this.batchInterval * 2.71;
                    console.log(this.batchInterval);
                    this.startBatching();
                }
                return;
            }

            this.backoff = 1;
            this.batchInterval = 2000;
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