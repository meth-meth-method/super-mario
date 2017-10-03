class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.tileSize = tileSize;
        this.matrix = matrix;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            return {
                tile,
                indexX,
                indexY,
            };
        }
    }

    matchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY));
    }
}

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    test(entity) {
        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
        if (match) {
            console.log('Matching tile', match, match.tile);
        }
    }
}
