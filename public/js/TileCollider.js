export default class TileCollider {
    constructor(tiles) {
        this.tiles = tiles;
    }

    test(entity) {
        console.log('Testing', entity);
    }
}
