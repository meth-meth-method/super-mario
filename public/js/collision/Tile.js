import {Vec2} from '../math.js';

const TILE_SIZE = 16;

function overlap({bounds}, tileX, tileY) {
    return bounds.right > tileX * TILE_SIZE
        && bounds.bottom > tileY * TILE_SIZE;
}

export default class TileCollisionDetector {
    constructor(tiles, entities) {
        this.tiles = tiles;
        this.entities = entities;
        this.previous = new Map();
    }

    getTile(tileX, tileY) {
        return this.tiles.get(tileX, tileY);
    }

    range(xRange, yRange, fn) {
        xRange.forEach(x => {
            yRange.forEach(y => {
                const tileX = Math.floor(x / 16);
                const tileY = Math.floor(y / 16);
                const tile = this.getTile(tileX, tileY);
                if (tile) {
                    fn(tile, tileX, tileY);
                }
            });
        });
    }

    testX(entity) {
        const {top, bottom, pos} = this.previous.get(entity);
        const deltaX = entity.pos.x - pos.x;

        let x;
        if (deltaX > 0) {
            x = entity.bounds.right;
        } else if (deltaX < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        this.range([x], [top, bottom], (tile, x, y) => {
            if (overlap(entity, x, y) && tile.collideX) {
                tile.collideX(entity);
            }
        });
    }

    testY(entity) {
        const {left, right, pos} = this.previous.get(entity);
        const deltaY = entity.pos.y - pos.y;

        let y;
        if (deltaY > 0) {
            y = entity.bounds.bottom;
        } else if (deltaY < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }

        this.range([left, right], [y], (tile, x, y) => {
            if (overlap(entity, x, y) && tile.collideY) {
                tile.collideY(entity);
            }
        });
    }

    testEntity(entity) {
        if (!this.previous.has(entity)) {
            this.previous.set(entity, entity.bounds.clone());
        }

        this.testX(entity);
        this.testY(entity);

        this.previous.get(entity).copy(entity.bounds);
    }

    test() {
        this.entities.forEach(entity => {
            this.testEntity(entity);
        });
    }
}
