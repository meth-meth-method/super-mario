import TileResolver from './TileResolver.js';
import {ground} from './tiles/ground.js';

const handlers = {
    ground,
};

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);

        matches.forEach(match => {
            this.handle(0, match, entity);
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            entity.bounds.left, entity.bounds.right,
            y, y);

        matches.forEach(match => {
            this.handle(1, match, entity);
        });
    }

    handle(index, match, entity) {
        const type = match.tile.type;
        const handler = handlers[type];
        if (!handler) {
            return;
        }
        handler[index](match, entity);
    }
}
