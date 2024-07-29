import HumanProofWorker from "../workers/HumanProof.worker";
import init, { greet } from "../wasm/human-proof/pkg"
export class HumanProofService {
    worker: Worker;

    init() {
        const blob = new Blob(['self.onmessage = ', HumanProofWorker.toString()], { type: 'text/javascript' });
        this.worker = new Worker(URL.createObjectURL(blob));

        this.worker.onmessage = function (event: MessageEvent<number>) {
            console.log('Received result from worker:', event.data);
        };

        init().then(()=>{
            greet('bebe');
        });

        this.worker.postMessage(10);
    }
}