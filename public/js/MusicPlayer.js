export default class MusicPlayer {
    constructor() {
        this.tracks = new Map();
    }

    addTrack(name, url) {
        const audio = new Audio();
        audio.loop = true;
        audio.src = url;
        this.tracks.set(name, audio);
    }

    playTrack(name) {
        this.pauseAll();
        const audio = this.tracks.get(name);
        audio.play();
        return audio;
    }

    pauseAll() {
        for (const audio of this.tracks.values()) {
            audio.pause();
        }
    }
}
