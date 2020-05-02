export default class MusicController {
    constructor() {
        this.player = null;
    }

    setPlayer(player) {
        this.player = player;
    }

    playTheme(speed = 1) {
        const audio = this.player.playTrack('main');
        audio.playbackRate = speed;
    }

    playHurryTheme() {
        const audio = this.player.playTrack('hurry');
        audio.loop = false;
        audio.addEventListener('ended', () => {
            this.playTheme(1.3);
        }, {once: true});
    }

    pause() {
        this.player.pauseAll();
    }
}
