export default class TileResolver {
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
            const y1 = indexY * this.tileSize;
            return {
                tile,
                indexX,
                indexY,
                y1,
            };
        }
    }

    matchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY));
    }
}
