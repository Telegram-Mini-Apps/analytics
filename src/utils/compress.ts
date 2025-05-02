async function compressData(data: Record<string, any> | Record<string, any>[]) {
    const stream = new Blob([JSON.stringify(data)]).stream();
    const compressedStream = stream.pipeThrough(new CompressionStream('gzip'));

    return await new Response(compressedStream).blob();
}