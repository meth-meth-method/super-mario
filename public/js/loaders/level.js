import {Matrix} from '../math.js';
import Level from '../Level.js';
import SpriteSheet from '../SpriteSheet.js';
import {loadJSON, loadSpriteSheet} from '../loaders.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';
import {createAnim} from '../anim.js';

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
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}

function expandTiles(tiles, patterns) {
    const expandedTiles = [];

    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    console.log('Pattern %s at %d, %d', tile.pattern, derivedX, derivedY);
                    console.log(patterns[tile.pattern]);
                    walkTiles(patterns[tile.pattern].tiles, derivedX, derivedY);
                } else {
                    expandedTiles.push({
                        tile,
                        x: derivedX,
                        y: derivedY,
                    });
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);

    return expandedTiles;
}

function createCollisionGrid(tiles, patterns = null) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type});
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns = null) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {name: tile.name});
    }

    return grid;
}

export function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
            return mergedTiles.concat(layerSpec.tiles);
        }, []);
        const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
        level.setCollisionGrid(collisionGrid);

        levelSpec.layers.forEach(layerSpec => {
            const backgroundGrid = createBackgroundGrid(layerSpec.tiles, levelSpec.patterns);
            const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
            level.comp.layers.push(backgroundLayer);
        });

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}
