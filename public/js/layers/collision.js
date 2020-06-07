function createEntityLayer(entities) {
    return function drawBoundingBox(context, camera) {
        context.strokeStyle = 'red';
        entities.forEach(entity => {
            context.beginPath();
            context.rect(
                Math.floor(entity.bounds.left - camera.pos.x) + .5,
                Math.floor(entity.bounds.top - camera.pos.y) + .5,
                entity.size.x - 1,
                entity.size.y -1);
            context.stroke();
        });
    };
}

function createTileCandidateLayer(tileResolver) {
    const resolvedTiles = [];

    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawTileCandidates(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                Math.floor(x * tileSize - camera.pos.x) + .5,
                Math.floor(y * tileSize - camera.pos.y) + .5,
                tileSize - 1,
                tileSize - 1);
            context.stroke();
        });

        resolvedTiles.length = 0;
    }
}

export function createCollisionLayer(level) {

    const drawTileCandidates = level.tileCollider.resolvers.map(createTileCandidateLayer);
    const drawBoundingBoxes = createEntityLayer(level.entities);

    return function drawCollision(context, camera) {
        drawTileCandidates.forEach(draw => draw(context, camera));
        drawBoundingBoxes(context, camera);
    };
}
