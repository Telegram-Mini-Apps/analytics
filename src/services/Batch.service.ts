import { BATCH_KEY } from "../constants";
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
    }

    public init() {
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

        if (data.length !== 0) {
            this.sendBatch(data);
        }
    }

    private sendBatch(batch: Record<string, any>[]) {
        this.stopBatching();
        this.storage.setItem([]);
        this.appModule.recordEvents(batch).then((res: Response)=> {
            if (!res.ok) {
                this.storage.setItem([...this.storage.getBatch(), ...batch]);
            }
            this.startBatching();
        }, (error) => {
            console.log(error);
            this.storage.setItem([...this.storage.getBatch(), ...batch]);
            this.startBatching();
        });
    }
}