import { CloudStorage } from "@twa-dev/types";

export class BatchStorage {
    private cloudStorage: CloudStorage;
    private localStorage: Storage;

    private readonly key: string;

    constructor(key: string) {
        this.cloudStorage = window?.Telegram?.WebApp.CloudStorage;
        this.localStorage = window.localStorage;
        this.key = key;
        this.getBatch()
    }

    public getBatch(
        event_name?: string,
        requestBody?: Record<string, any>,
        keepalive: boolean = false,
        callback?: (result: string) => void
    ) {
        if (keepalive){
            if (event_name) {
                this.setItem([
                    ...JSON.parse(this.localStorage.getItem(this.key)),
                    {
                        event_name,
                        ...requestBody,
                    }]);
            }
        }

        this.cloudStorage.getItem(this.key, (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            if (!result){
                this.cloudStorage.setItem(this.key, JSON.stringify([]));
            }

            result = JSON.stringify(
                [...JSON.parse(result), ...JSON.parse(this.localStorage.getItem(this.key))]
                    .filter((obj, idx, arr) =>
                        arr.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === idx));

            this.localStorage.setItem(this.key, result);

            callback(result);
        });
    }

    public setItem(value: any, callback?: (error: null | string) => void) {
        this.localStorage.removeItem(this.key);
        this.localStorage.setItem(this.key, JSON.stringify(value));
        this.cloudStorage.setItem(this.key, JSON.stringify(value), callback);
    }
}