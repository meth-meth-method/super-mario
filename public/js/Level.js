import Camera from './Camera.js';
import Compositor from './Compositor.js';
import EventEmitter from './EventEmitter.js';
import MusicController from './MusicController.js';
import EntityCollider from './EntityCollider.js';
import TileCollider from './TileCollider.js';
import { findPlayers } from './player.js';

function focusPlayer(level) {
    for (const player of findPlayers(level)) {
        level.camera.pos.x = Math.max(0, player.pos.x - 100);
        return;
    }
}

export default class Level {
    constructor() {
        this.name = "";

        this.gravity = 1500;
        this.totalTime = 0;

        this.camera = new Camera();
        this.events = new EventEmitter();

        this.music = new MusicController();

        this.comp = new Compositor();
        this.entities = new Set();

        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = new TileCollider();
    }

    draw(gameContext) {
        this.comp.draw(gameContext.videoContext, this.camera);
    }

    update(gameContext) {
        this.entities.forEach(entity => {
            entity.update(gameContext, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });

        focusPlayer(this);

        this.totalTime += gameContext.deltaTime;
    }
}
