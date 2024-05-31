import { BATCH_KEY } from "../constants";
import { App } from "../app";
import { BatchStorage } from "../repositories/BatchStorage";

export class BatchService {
    private appModule: App;
    private storage: BatchStorage;
    private intervalId: number | null = null;

    private readonly batchInterval: number = 1000;
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

    public collect(event_name: string, requestBody?: Record<string, any>) {
        let [data, errorMessage] = this.storage.getBatch();
        if (errorMessage !== null) {
            console.log(errorMessage);
            return;
        }

        data.push({
            event_name,
            ...requestBody,
        });

        this.storage.setItem(data);
    }

    private startBatching() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => this.processQueue(), this.batchInterval);
        }
    }

    private processQueue() {
        const [data, errorMessage]: [Record<string, any>[], string | null] = this.storage.getBatch();

        if (errorMessage !== null) {
            console.log(errorMessage);
            return;
        }

        if (data.length === 0) {
            return;
        }

        this.sendBatch(data);
    }

    private sendBatch(batch: Record<string, any>[]) {
        this.storage.setItem([]);
        this.appModule.recordEvents(batch).catch((err) => {
            console.log(err);
            this.storage.setItem(batch);
        });
    }
}