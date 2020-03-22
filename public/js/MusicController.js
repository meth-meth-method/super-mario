export default class MusicController {
    constructor() {
        this.player = null;
    }

    setPlayer(player) {
        this.player = player;
    }

    playTheme(speed = 1) {
        const audio = this.player.playTrack('main');
        audio.currentTime = 0;
        audio.playbackRate = speed;
    }

    playHurryTheme() {
        const audio = this.player.playTrack('hurry');
        audio.loop = false;
        const next = () => this.playTheme(1.2);
        audio.addEventListener('ended', () => {
            next();
            audio.removeEventListener('ended', next);
        });
    }
}
