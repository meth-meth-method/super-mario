import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadBullet} from './entities/Bullet.js';
import {loadCannon} from './entities/Cannon.js';
import {loadBrickSharpnel} from './entities/BrickSharpnel.js';

export async function loadEntities(audioContext) {
    const entityFactories = {};

    async function setup(loader, name) {
        entityFactories[name] = await loader(audioContext);
    }

    await Promise.all([
        setup(loadMario, 'mario'),
        setup(loadGoomba, 'goomba'),
        setup(loadKoopa, 'koopa'),
        setup(loadBullet, 'bullet'),
        setup(loadCannon, 'cannon'),
        setup(loadBrickSharpnel, 'brickSharpnel'),
    ]);

    return entityFactories;
}
