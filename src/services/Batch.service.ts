import {BATCH_KEY} from "../constants";
import { App } from "../app";
import { BatchStorage } from "../repositories/BatchStorage";

export class BatchService {
    private appModule: App;
    private storage: BatchStorage;
    private intervalId: number | null = null;

    private readonly batchInterval: number = 1500;
    private readonly BATCH_KEY: string = BATCH_KEY;

    constructor(appModule: App) {
        this.storage = new BatchStorage(this.BATCH_KEY);
        this.appModule = appModule;
        this.startBatching();
    }

    public init() {
        this.processQueue();
    }

    public stopBatching() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public collect(event_name: string, requestBody?: Record<string, any>, keepalive: boolean = false) {
        this.storage.getBatch(
            event_name,
            requestBody,
            keepalive,
            (result: string) => {
            const data: Record<string, any> = JSON.parse(result);

            data.push({
                event_name,
                ...requestBody,
            });

            this.storage.setItem(data);
        });
    }

    private startBatching() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => this.processQueue(), this.batchInterval);
        }
    }

    private processQueue() {
        this.storage.getBatch(undefined, undefined, false, (result: string) => {
            if (JSON.parse(result).length === 0) {
                return;
            }

            this.sendBatch(JSON.parse(result));
        });
    }

    private sendBatch(batch: Record<string, any>[]) {
        this.stopBatching();
        this.storage.setItem([]);
        this.appModule.recordEvents(batch).then(()=> {
            this.startBatching();
        }, (err) => {
            console.log(err);
            this.storage.setItem(batch);
        });
    }
}