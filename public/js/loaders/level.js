import {Matrix} from '../math.js';
import Level from '../Level.js';
import {createSpriteLayer} from '../layers/sprites.js';
import {createBackgroundLayer} from '../layers/background.js';
import {loadJSON, loadSpriteSheet} from '../loaders.js';

function setupCollision(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);
    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);
}

function setupBackgrounds(levelSpec, level, backgroundSprites) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    });
}

function setupEntities(levelSpec, level, entityFactory) {
    levelSpec.entities.forEach(({name, pos: [x, y]}) => {
        const createEntity = entityFactory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        level.entities.add(entity);
    });

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
}

export function createLevelLoader(entityFactory) {
    return function loadLevel(name) {
        return loadJSON(`/levels/${name}.json`)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet),
        ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();

            setupCollision(levelSpec, level);
            setupBackgrounds(levelSpec, level, backgroundSprites);
            setupEntities(levelSpec, level, entityFactory);

            return level;
        });
    }
}

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type});
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {name: tile.name});
    }

    return grid;
}


function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y};
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY,
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}
