import {Matrix} from './math.js';

export function createBackgroundLayer(tiles, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    const context = buffer.getContext('2d');
    tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.graphic, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        });
    };
}

export function createCollisionLayer(level) {
    const usedTiles = new Matrix();
    const getTile = level.collision.getTile;
    level.collision.getTile = function fakeGetTile(x, y) {
        usedTiles.set(x, y, true);
        return getTile.call(level.collision, x, y);
    }

    return function drawCollisions(context) {
        context.strokeStyle = 'blue';
        usedTiles.forEach((value, x, y) => {
            context.beginPath();
            context.rect(x * 16, y * 16, 16, 16);
            context.stroke();
        });
        usedTiles.clear();

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        });
    };
}
