import {App} from "../app";
import {BACKEND_URL} from "../constants";

export class HumanProofService {
    worker: Worker;

    constructor(private readonly appModule: App) {}

    async init() {
        await fetch(BACKEND_URL + 'HumanProof.worker.js').then(async r => {
            this.worker = new Worker(URL.createObjectURL(await r.blob()));

            await fetch(BACKEND_URL + 'human-proof').then(async res => {
                this.appModule.taskParams = await res.json();

                this.worker.onmessage = (event: MessageEvent<Map<'x' | 'y', number>>) => {
                    this.appModule.taskSolution = {
                        x: event.data.get('x'),
                        y: event.data.get('y'),
                    };
                };
            });
        });
    }

    public getNewArgs(data: string) {
        try {
            this.appModule.taskParams = JSON.parse(
                this.appModule.decoder.decode(
                    new Uint8Array(data.split(',').map((el) => parseInt(el)))
                )
            );
            this.appModule.solveTask();
        } catch (e) {}
    }

    solveTask() {
        this.worker.postMessage({
            args: {
                a: this.appModule.taskParams.a,
                b: this.appModule.taskParams.b,
            }
        });
    }
}