export default class AudioBoard{

    constructor(context){
        this.context = context;
        this.buffers = new Map();

    }

    addAudio(name,buffer){
        this.buffers.set(name,buffer);
    }

    playAudio(name){
        const source =this.context.createBufferSource()
        source.connect(this.context.destination);
        source.buffer = this.buffers.get(name);
        source.start(0);
    }
}