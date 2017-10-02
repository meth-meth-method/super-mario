import Level from '../Level.js';
import {loadBackgroundSprites} from '../sprites.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';

const TILE_SIZE = 16;

const NOOP = {
    collideX: () => {},
    collideY: () => {},
};

function createSolid(x1, y1, x2, y2) {
    return {
        collideX: function collideX(entity) {
            if (entity.vel.x > 0 && entity.bounds.right > x1) {
                entity.bounds.right = x1;
            } else if (entity.vel.x < 0 && entity.bounds.left < x2) {
                entity.bounds.left = x2;
            }
            entity.vel.x = 0;
        },

        collideY: function collideY(entity) {
            if (entity.vel.y > 0 && entity.bounds.bottom > y1) {
                entity.bounds.bottom = y1;
            } else if (entity.vel.y < 0 && entity.bounds.top < y2) {
                entity.bounds.top = y2;
            }
            entity.vel.y = 0;
        },
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
        return NOOP;
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

                const collider = createCollider(name, x, y);
                const tile = Object.assign({
                    graphic: name,
                }, collider);

                level.tiles.set(x, y, tile);
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
