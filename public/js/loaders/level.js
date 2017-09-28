import Level from '../Level.js';
import {loadBackgroundSprites} from '../sprites.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';

const TILE_SIZE = 16;

function noop() {
}

function createSolid(x1, y1, x2, y2) {
    return function solid(entity) {
        if (entity.vel.y > 0) {
            entity.vel.y = 0;
            entity.pos.y = y1;
        } else if (entity.vel.y < 0) {
            entity.vel.y = 0;
            entity.pos.y = y2;
        }
    };
}

function createCollider(name, x, y) {
    const x1 = x * TILE_SIZE;
    const y1 = y * TILE_SIZE;
    const x2 = x1 + TILE_SIZE;
    const y2 = y1 + TILE_SIZE;

    if (name === 'ground') {
        return createSolid(x1, y1, x2, y2);
    } else {
        return noop;
    }
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        const tiler = createTiler(level, background);
        background.ranges.forEach(tiler);
    });
}

function createTiler(level, background) {
    return function rangeTiler([x1, x2, y1, y2]) {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                const name = background.tile;

                level.tiles.set(x, y, {
                    graphic: name,
                    collide: createCollider(name, x, y),
                });
            }
        }
    };
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

        const backgroundLayer = createBackgroundLayer(level.tiles, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}
