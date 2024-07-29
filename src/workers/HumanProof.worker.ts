export default function (event: MessageEvent<number>) {
    // Perform some heavy computation
    const result = event.data * 2;

    // Send the result back to the main thread
    postMessage(result);
}
