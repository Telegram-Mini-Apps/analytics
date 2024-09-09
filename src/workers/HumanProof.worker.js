importScripts('https://tganalytics.xyz/d2601c1d81d312e2edcccde782150cce47a66c30');

wasm_init('https://tganalytics.xyz/89a2cb86e39babdfd9f59de57866041038c910be').then(()=>{
    self.onmessage = function (event) {
        const foo = e12f1e505654847829d9ae61aab7527dd0fd884(event.data.args.a, event.data.args.b);
        postMessage(foo);
    }
});




