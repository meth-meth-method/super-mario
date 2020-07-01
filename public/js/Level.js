import Camera from './Camera.js';
import MusicController from './MusicController.js';
import EntityCollider from './EntityCollider.js';
import Scene from './Scene.js';
import TileCollider from './TileCollider.js';
import { clamp } from './math.js';
import { findPlayers } from './player.js';

function focusPlayer(level) {
    for (const player of findPlayers(level.entities)) {
        level.camera.pos.x = clamp(
            player.pos.x - 100,
            level.camera.min.x,
            level.camera.max.x - level.camera.size.x);
    }
}

class EntityCollection extends Set {
    get(id) {
        for (const entity of this) {
            if (entity.id === id) {
                return entity;
            }
        }
    }
}

export default class Level extends Scene {
    static EVENT_TRIGGER = Symbol('trigger');
    static EVENT_COMPLETE = Symbol('complete');

    constructor() {
        super();

        this.name = "";

        this.checkpoints = [];

        this.gravity = 1500;
        this.totalTime = 0;

        this.camera = new Camera();

        this.music = new MusicController();

        this.entities = new EntityCollection();

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

    pause() {
        this.music.pause();
    }
}
