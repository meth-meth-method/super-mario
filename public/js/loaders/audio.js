export function createAudioLoader(context) {
    return function loadAudio(url) {
        return fetch(url)
           .then(response => {
                return response.arrayBuffer();
            })
            .then(arrayBuffer => {
                return context.decodeAudioData(arrayBuffer);
            });
    }
}
