export default class AudioBoard {
    constructor() {
        this.buffers = new Map();
    }

    addAudio(name, buffer) {
        this.buffers.set(name, buffer);
    }

    playAudio(name, context) {
        const source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = this.buffers.get(name);
        source.start(0);
    }
}
