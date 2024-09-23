importScripts('https://tganalytics.xyz/d2601c1d81d312e2edcccde782150cce47a66c30');

const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

wasm_init('https://tganalytics.xyz/89a2cb86e39babdfd9f59de57866041038c910be').then(()=>{
    self.onmessage = function (event) {
        const params = JSON.parse(textDecoder.decode(
            new Uint8Array(event.data.split(',').map((byte) => parseInt(byte))),
        ));

        const solution = e12f1e505654847829d9ae61aab7527dd0fd884(params.a, params.b);
        const encodedSolution = String(textEncoder.encode(JSON.stringify(solution)));

        postMessage(encodedSolution);
    }
});




