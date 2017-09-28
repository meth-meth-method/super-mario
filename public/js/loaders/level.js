import Level from '../Level.js';
import {loadBackgroundSprites} from '../sprites.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tiles.set(x, y, {
                        graphic: background.tile,
                    });
                }
            }
        });
    });
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`)
        .then(r => r.json()),

        loadBackgroundSprites(),
    ])
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}
