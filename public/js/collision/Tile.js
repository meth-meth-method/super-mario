const TILE_SIZE = 16;
const ERROR_MARGIN = 0.0000000001;

export default class TileCollisionDetector {
    constructor(tiles, entities) {
        this.tiles = tiles;
        this.entities = entities;
    }

    getTile(tileX, tileY) {
        return this.tiles.get(tileX, tileY);
    }

    range(xRange, yRange, fn) {
        xRange.forEach(x => {
            yRange.forEach(y => {
                const tileX = Math.floor(x / TILE_SIZE);
                const tileY = Math.floor(y / TILE_SIZE);
                const tile = this.getTile(tileX, tileY);
                if (tile) {
                    fn(tile, tileX, tileY);
                }
            });
        });
    }

    iterateIntersecting(entity, callback) {
        const {left, right, top, bottom} = entity.bounds;

        this.range([
            left,
            right - ERROR_MARGIN,
        ], [
            top,
            bottom - ERROR_MARGIN,
        ], callback);
    }

    testX(entity) {
        this.iterateIntersecting(entity, tile => {
            tile.collideX(entity);
        });
    }

    testY(entity) {
        this.iterateIntersecting(entity, tile => {
            tile.collideY(entity);
        });
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.pos.x += entity.vel.x * deltaTime;
            this.testX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.testY(entity);
        });
    }
}
