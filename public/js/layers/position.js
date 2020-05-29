function createTileCandidateLayer(tileResolver) {
    const resolvedTiles = [];
    const tileSize = tileResolver.tileSize;
    const tileSizeHalf = tileSize / 2;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawTileCandidates(context, camera) {
        context.font = 'normal 12px monospace';
        context.fillStyle = '#fff';
        context.strokeStyle = 'rgba(0, 255, 0, 0.5)';

        resolvedTiles.forEach(({x, y}, i) => {
            if(i == 0) {
                context.beginPath();
                context.rect(
                    Math.floor(x * tileSize - camera.pos.x),
                    Math.floor(y * tileSize - camera.pos.y),
                    tileSize, tileSize);

                context.rect(
                    Math.floor(x * tileSize - camera.pos.x),
                    Math.floor(y * tileSize - camera.pos.y),
                    tileSize, - tileSize * 13 );

                context.stroke();

                const tileCoords = `x:${x} y:${y}`;
                const pxCoords = `x:${x * tileSize}px y:${y * tileSize}(${y * tileSize - tileSize})`;

                context.fillText(tileCoords, 
                    x * tileSize + tileSize + tileSizeHalf - camera.pos.x, 
                    y * tileSize - camera.pos.y - tileSize * 2);

                context.fillText(pxCoords, 
                    x * tileSize + tileSize + tileSizeHalf - camera.pos.x, 
                    y * tileSize - camera.pos.y - tileSize);
            }

        });

        resolvedTiles.length = 0;
    }
}

export function createPositionLayer(level, font) {
    const drawTileCandidates = level.tileCollider.resolvers.map(createTileCandidateLayer);
    return function drawCollision(context, camera,) {
        drawTileCandidates.forEach(draw => draw(context, camera));

        //font.print('HELLO', context, 1, 1 );

    };
}

