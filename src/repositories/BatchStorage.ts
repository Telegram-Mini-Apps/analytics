import { CloudStorage } from "@twa-dev/types";

export class BatchStorage {
    private cloudStorage: CloudStorage;
    private localStorage: Storage;

    private readonly key: string;

    constructor(key: string) {
        this.cloudStorage = window?.Telegram?.WebApp.CloudStorage;
        this.localStorage = window.localStorage;
        this.key = key;

        if (this.localStorage.getItem(this.key) === null) {
            this.localStorage.setItem(this.key, JSON.stringify([]));
        }

        this.getBatch()
}

    public getBatch(callback?: (result: string) => void) {
        this.cloudStorage.getItem(this.key, (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            if (!result){
                this.cloudStorage.setItem(this.key, JSON.stringify([]));
            }

            if (JSON.parse(result).length < JSON.parse(this.localStorage.getItem(this.key)).length) {
                this.cloudStorage.setItem(this.key, this.localStorage.getItem(this.key));
            }

            callback(result);
        });
    }

    public getLocalStorage() {
        return this.localStorage;
    }

    public setItem(value: any) {
        this.localStorage.setItem(this.key, JSON.stringify(value));
        this.cloudStorage.setItem(this.key, JSON.stringify(value));
    }
}