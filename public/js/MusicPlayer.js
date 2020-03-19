export default class MusicPlayer {
    constructor(audio) {
        this.tracks = new Map();
    }

    addTrack(name, url) {
        const audio = new Audio();
        audio.src = url;
        audio.loop = true;
        this.tracks.set(name, audio);
    }

    playTrack(name) {
        const audio = this.tracks.get(name);
        audio.play();
    }
}
