import Compositor from './Compositor.js';
import TileCollisionDetector from './collision/Tile.js';
import {Matrix} from './math.js';

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

        this.collision.update(deltaTime);
    }
}
