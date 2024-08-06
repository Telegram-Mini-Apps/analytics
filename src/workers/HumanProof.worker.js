fetch('https://test.tganalytics.xyz/initWasmModule.js').then(async r => {
    importScripts(URL.createObjectURL(await r.blob()));

    wasm_init('https://test.tganalytics.xyz/human_proof_bg.wasm').then(()=>{
        self.onmessage = function (event) {
            const solution = solve_task(event.data.args.a, event.data.args.b);
            console.log('worker solution',solution);
            postMessage(solution);
        }
    });
});




