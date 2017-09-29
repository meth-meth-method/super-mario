export default class TileCollisionDetector {
    constructor(tiles, entities) {
        this.tiles = tiles;
        this.entities = entities;
    }

    getTile(tileX, tileY) {
        return this.tiles.get(tileX, tileY);
    }

    lookupTile(x, y) {
        return this.getTile(
            Math.floor(x / 16),
            Math.floor(y / 16));
    }

    testTile(entity, x, y) {
        const tile = this.lookupTile(x, y);
        if (tile) {
            tile.collide(entity);
        }
    }

    testEntity(entity) {
        {
            const x = [
                entity.bounds.left,
                entity.bounds.right,
            ];

            let y;
            if (entity.vel.y > 0) {
                y = entity.bounds.bottom;
            } else if (entity.vel.y < 0) {
                y = entity.bounds.top;
            }

            x.forEach(x => {
                this.testTile(entity, x, y);
            });
        }

        {
            const y = [
                entity.bounds.top,
                entity.bounds.bottom,
            ];

            let x;
            if (entity.vel.x > 0) {
                x = entity.bounds.right;
            } else if (entity.vel.x < 0) {
                x = entity.bounds.left;
            }

            y.forEach(y => {
                this.testTile(entity, x, y);
            });
        }
    }

    test() {
        this.entities.forEach(entity => {
            this.testEntity(entity);
        });
    }
}
