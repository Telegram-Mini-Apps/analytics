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

        this.cloudStorage.getItem(this.key, (error: string | null, result: string) => {
            if (error !== null) {
                console.log(error);
                return;
            }

            if (result === ''){
                this.cloudStorage.setItem(this.key, JSON.stringify([]));
            }

            if (JSON.parse(result).length < JSON.parse(this.localStorage.getItem(this.key)).length) {
                this.cloudStorage.setItem(this.key, this.localStorage.getItem(this.key));
            }
        });
    }

    public getBatch(): [Record<string, any>[], string | null] {
        let item: Record<string, any>[];
        let errorMessage: string | null;

        this.cloudStorage.getItem(this.key, (error: string | null, result: string) => {
            if (error !== null) {
                errorMessage = error;
                return;
            }

            if (JSON.parse(result).length === JSON.parse(window.localStorage.getItem(this.key)).length){
                if (JSON.parse(result).length === 0) {
                    item = [];
                } else {
                    item = JSON.parse(result);
                }
            }
        });

        return [item, errorMessage];
    }

    public setItem(value: any) {
        this.localStorage.setItem(this.key, value);
        this.cloudStorage.setItem(this.key, value);
    }
}