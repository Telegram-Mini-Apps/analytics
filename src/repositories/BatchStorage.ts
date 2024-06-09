export class BatchStorage {
    private sessionStorage: Storage;
    private localStorage: Storage;

    private readonly key: string;

    constructor(key: string) {
        this.sessionStorage = window.sessionStorage;
        this.localStorage = window.localStorage;

        navigator.storage.persist();

        this.key = key;

        const savedData: string | null = this.localStorage.getItem(this.key);
        if (savedData === null) {
            this.setItem([]);
        } else {
            this.setItem(JSON.parse(savedData));
        }
    }

    public getBatch() {
        if ((this.sessionStorage.getItem(this.key) === null) && (this.localStorage.getItem(this.key) === null)) {
            this.setItem([]);
        } else {
            this.setItem(JSON.parse(this.localStorage.getItem(this.key)));
        }

        this.setItem(
            [...JSON.parse(this.sessionStorage.getItem(this.key)), ...JSON.parse(this.localStorage.getItem(this.key))]
                .filter((obj, idx, arr) =>
                    arr.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === idx));
        return JSON.parse(this.sessionStorage.getItem(this.key));
    }

    public addToStorage(event_name: string, requestBody?: Record<string, any>) {
        const data: Record<string, any>[] = this.getBatch();

        data.push({
            event_name,
            ...requestBody,
        });

        this.setItem(data);
    }


    public setItem(value: any) {
        this.localStorage.setItem(this.key, JSON.stringify(value));
        this.sessionStorage.setItem(this.key, JSON.stringify(value));
    }
}