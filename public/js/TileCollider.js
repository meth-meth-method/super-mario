import TileResolver from './TileResolver.js';
import {brick} from './tiles/brick.js';
import {ground} from './tiles/ground.js';

const handlers = {
    brick,
    ground,
};

export default class TileCollider {
    constructor() {
        this.resolvers = [];
    }

    addGrid(matrix) {
        this.resolvers.push(new TileResolver(matrix));
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

        for (const tiles of this.resolvers) {
            const matches = tiles.searchByRange(
                x, x,
                entity.bounds.top, entity.bounds.bottom);

            matches.forEach(match => {
                this.handle(0, match, entity, tiles);
            });
        }
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

        for (const tiles of this.resolvers) {
            const matches = tiles.searchByRange(
                entity.bounds.left, entity.bounds.right,
                y, y);

            matches.forEach(match => {
                this.handle(1, match, entity, tiles);
            });
        }
    }

    handle(index, match, entity, tiles) {
        const type = match.tile.type;
        const handler = handlers[type];
        if (!handler) {
            return;
        }
        handler[index](match, entity, tiles);
    }
}
