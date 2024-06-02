import {BATCH_KEY, Events} from "../constants";
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

    public collect(event_name: string, requestBody?: Record<string, any>) {
        if (event_name === Events.HIDE) {
            const localStorage = this.storage.getLocalStorage();
            localStorage.setItem(this.BATCH_KEY, JSON.stringify([
                ...JSON.parse(localStorage.getItem(this.BATCH_KEY)),
                {
                    event_name,
                    ...requestBody,
                }
            ]),
            )
        }

        this.storage.getBatch(async (result: string) => {
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
        this.storage.getBatch((result: string) => {
            if (JSON.parse(result).length === 0) {
                return;
            }

            this.sendBatch(JSON.parse(result));
        });
    }

    private sendBatch(batch: Record<string, any>[]) {
        this.storage.setItem([]);
        console.log(batch);
        this.appModule.recordEvents(batch).catch((err) => {
            console.log(err);
            this.storage.setItem(batch);
        });
    }
}