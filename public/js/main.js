import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {createPlayer, createPlayerEnv} from './player.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardRenderer} from './layers/dashboard.js';

async function main(canvas) {
    const videoContext = canvas.getContext('2d');
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont(),
    ]);

    const createDashboardLayer = createDashboardRenderer(font);


    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-2');

    const mario = createPlayer(entityFactory.mario());
    mario.player.name = "MARIO";
    level.entities.add(mario);

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(level));

    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    const gameContext = {
        audioContext,
        videoContext,
        entityFactory,
        deltaTime: null,
    };

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);
        level.draw(gameContext);
    }

    timer.start();
}

const canvas = document.getElementById('screen');

const start = () => {
    window.removeEventListener('click', start);
    main(canvas);
};

window.addEventListener('click', start);
