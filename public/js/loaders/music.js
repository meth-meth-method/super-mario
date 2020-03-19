import {loadJSON} from '../loaders.js';
import MusicPlayer from '../MusicPlayer.js';

export function loadMusicSheet(name) {
    return loadJSON(`/music/${name}.json`)
        .then(musicSheet => {
            const musicPlayer = new MusicPlayer();
            for (const [name, track] of Object.entries(musicSheet)) {
                musicPlayer.addTrack(name, track.url);
            }
            return musicPlayer;
        });
}
