import { App } from "../app";
import { BACKEND_URL } from "../constants";

export class HumanProofService {
    worker: Worker;

    constructor(private readonly appModule: App) {}

    async init() {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await fetch(BACKEND_URL + 'c3e068ebf11840ed3fc311a6f2df80b20fa05d25').then(async r => {
                    this.worker = new Worker(URL.createObjectURL(await r.blob()));

                    await fetch(BACKEND_URL + 'aee7c93a9ae7930fb19732325d2c560c53849aa7').then(async res => {
                        this.appModule.taskParams = String(await res.text());

                        this.worker.onmessage = (event: MessageEvent<string>) => {
                            this.appModule.taskSolution = event.data;
                        };

                        resolve();
                    });
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    public setNewArgs(data: string) {
        this.appModule.taskParams = data
        this.solveTask();
    }

    solveTask() {
        if (this.worker !== undefined) {
            this.worker.postMessage(this.appModule.taskParams);
        }
    }
}