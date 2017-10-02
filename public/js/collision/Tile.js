const TILE_SIZE = 16;

function getTile(p) {
    return Math.floor(p / TILE_SIZE);
}

function getTileRange(p1, p2) {
    const pMax = Math.ceil(p2 / TILE_SIZE) * TILE_SIZE;
    const range = [];
    for (let p = p1; p < pMax; p = p + TILE_SIZE) {
        range.push(getTile(p));
    }
    return range;
}

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
                const tile = this.getTile(x, y);
                if (tile) {
                    fn(tile, x, y);
                }
            });
        });
    }

    testMoveX(entity) {
        const rangeX = [];
        if (entity.vel.x > 0) {
            rangeX.push(getTile(entity.bounds.right));
        } else if (entity.vel.x < 0) {
            rangeX.push(getTile(entity.bounds.left));
        }

        const rangeY = getTileRange(entity.bounds.top, entity.bounds.bottom);

        this.range(rangeX, rangeY, (tile, tileX, tileY) => {
            tile.collideX(entity);
        });
    }

    testMoveY(entity) {
        const rangeY = [];
        if (entity.vel.y > 0) {
            rangeY.push(getTile(entity.bounds.bottom));
        } else if (entity.vel.y < 0) {
            rangeY.push(getTile(entity.bounds.top));
        }

        const rangeX = getTileRange(entity.bounds.left, entity.bounds.right);

        this.range(rangeX, rangeY, (tile, tileX, tileY) => {
            tile.collideY(entity);
        });
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.pos.x += entity.vel.x * deltaTime;
            this.testMoveX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.testMoveY(entity);
        });
    }
}
