export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
    };
}

export function createSpriteLayer(entities, maxWidth = 64, maxHeight = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = maxWidth;
    spriteBuffer.height = maxHeight;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context, camera) {
        const {pos} = camera;

        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, maxWidth, maxHeight);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - pos.x,
                entity.pos.y - pos.y);
        });
    };
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollision(context) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize,
                y * tileSize,
                tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x, entity.pos.y,
                entity.size.x, entity.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
}