import MusicPlayer from '../MusicPlayer.js';
import {loadJSON} from '../loaders.js';

export function loadMusicSheet(name) {
    return loadJSON(`/music/${name}.json`)
        .then(musicSheet => {
            const musicPlayer = new MusicPlayer();
            for (const [key, value] of Object.entries(musicSheet)) {
                musicPlayer.addTrack(key, value.url);
            }
            return musicPlayer;
        });
}
