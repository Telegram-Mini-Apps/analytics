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

            if (JSON.parse(this.localStorage.getItem(this.key)) === null) {
                this.localStorage.setItem(this.key, JSON.stringify([]));
            }

            if (JSON.parse(result).length !== JSON.parse(this.localStorage.getItem(this.key)).length) {
                result = this.localStorage.getItem(this.key);
                this.cloudStorage.setItem(this.key, this.localStorage.getItem(this.key));
            }

            callback(result);

            if (JSON.parse(result).length !== JSON.parse(this.localStorage.getItem(this.key)).length) {
                this.cloudStorage.setItem(this.key, this.localStorage.getItem(this.key));
            }
        });
    }

    public setItem(value: any) {
        this.localStorage.setItem(this.key, JSON.stringify(value));
        this.cloudStorage.setItem(this.key, JSON.stringify(value));
    }
}