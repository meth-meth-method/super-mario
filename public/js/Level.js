import Compositor from './Compositor.js';
import {Matrix} from './math.js';

class TileCollisionDetector {
    constructor(tiles, entities) {
        this.tiles = tiles;
        this.entities = entities;
    }

    lookupTile(pos) {
        const x = Math.floor(pos.x / 16);
        const y = Math.floor(pos.y / 16);
        return this.tiles.get(x, y);
    }

    testEntity(entity) {
        const tile = this.lookupTile(entity.pos);
        if (tile) {
            tile.collide(entity);
        }
    }

    test() {
        this.entities.forEach(entity => {
            this.testEntity(entity);
        });
    }
}

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.collision = new TileCollisionDetector(this.tiles, this.entities);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });

        this.collision.test();
    }
}
