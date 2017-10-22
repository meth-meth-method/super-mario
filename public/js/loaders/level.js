import Level from '../Level.js';
import SpriteSheet from '../SpriteSheet.js';
import {loadJSON, loadSpriteSheet} from '../loaders.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';
import {createAnim} from '../anim.js';

function createTiles(level, backgrounds, patterns, offsetX = 0, offsetY = 0) {

    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (background.pattern) {
                    console.log('Pattern %s at %d, %d', background.pattern, derivedX, derivedY);
                    console.log(patterns[background.pattern]);
                    createTiles(level, patterns[background.pattern].backgrounds, patterns, derivedX, derivedY);
                } else {
                    level.tiles.set(derivedX, derivedY, {
                        name: background.tile,
                        type: background.type,
                    });
                }
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);

            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);

            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
}

export function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds, levelSpec.patterns);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}
