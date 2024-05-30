import { BATCH_KEY } from "../constants";
import { App } from "../app";
import { CloudStorage } from "@twa-dev/types";

export class BatchController {
    private intervalId: number | null = null;
    private readonly batchInterval: number = 1000;
    private appModule: App;
    private storage: CloudStorage;

    constructor(appModule: App) {
        this.storage = window?.Telegram?.WebApp.CloudStorage;

        if (window.localStorage.getItem(BATCH_KEY) === null) {
            window.localStorage.setItem(BATCH_KEY, JSON.stringify([]));
        }

        this.storage.getItem(BATCH_KEY, (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            if (result === ''){
                this.storage.setItem(BATCH_KEY, JSON.stringify([]));
            }

            if (JSON.parse(result).length !== JSON.parse(window.localStorage.getItem(BATCH_KEY))) {
                this.storage.setItem(BATCH_KEY, window.localStorage.getItem(BATCH_KEY));
            }
        });

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

    public addToQueue(event_name: string, requestBody?: Record<string, any>) {
        let data = JSON.parse(window.localStorage.getItem(BATCH_KEY));
        data.push({
            event_name,
            ...requestBody,
        });
        window.localStorage.setItem(BATCH_KEY, JSON.stringify(data));

        this.storage.getItem(BATCH_KEY, (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            let data = JSON.parse(result);
            data.push({
                event_name,
                ...requestBody,
            });
            this.storage.setItem(BATCH_KEY, JSON.stringify(data));
        });
    }

    private startBatching() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => this.processQueue(), this.batchInterval);
        }
    }

    private processQueue() {
        this.storage.getItem(BATCH_KEY,  (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            if (JSON.parse(result).length === 0) {
               return;
            }

            this.sendBatch();
        });
    }

    private sendBatch() {
        this.storage.getItem(BATCH_KEY,  (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            if (JSON.parse(result).length === JSON.parse(window.localStorage.getItem(BATCH_KEY)).length){
                if (JSON.parse(result).length === 0) {
                    return;
                }
            }

            this.storage.setItem(BATCH_KEY, JSON.stringify([]));

            this.appModule.recordManyEvents(JSON.parse(result)).catch(
               (err) => {
                   console.log(err);
                   this.storage.setItem(BATCH_KEY, result);
               }
           );
        });
    }
}