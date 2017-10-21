export function createBackgroundLayer(level, sprites) {
    const tiles = level.tiles;
    const resolver = level.tileCollider.tiles;

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    function redraw(startIndex, endIndex)  {
        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.name, context, x - startIndex, y);
                    }
                });
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(buffer,
            -camera.pos.x % 16,
            -camera.pos.y);
    };
}

export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });
    };
}

function createTileColliderLayer(tileCollider) {
    const resolvedTiles = [];

    const tileResolver = tileCollider.tiles;
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        const match = getByIndexOriginal.call(tileResolver, x, y);
        if (match) {
            resolvedTiles.push(match);
        }
        return match;
    }

    return function drawTileCollisions(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({tile, x1, x2, y1, y2}) => {
            context.strokeRect(
                x1 - camera.pos.x,
                y1 - camera.pos.y,
                x2 - x1,
                y2 - y1);
        });

        resolvedTiles.length = 0;
    };
}

function createEntityRectLayer(entities) {
    return function drawEntityRects(context, camera) {
        context.strokeStyle = 'red';
        entities.forEach(entity => {
            context.strokeRect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y);
        });
    };
}

export function createCollisionLayer(level) {
    const layers = [
        createTileColliderLayer(level.tileCollider),
        createEntityRectLayer(level.entities),
    ];

    return function drawCollision(context, camera) {
        layers.forEach(drawLayer => drawLayer(context, camera));
    };
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.strokeRect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y);
    };
}