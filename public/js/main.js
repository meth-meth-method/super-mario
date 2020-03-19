import Camera from './Camera.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {createPlayer, createPlayerEnv} from './player.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';


async function main(canvas) {
    const context = canvas.getContext('2d');
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont(),
    ]);


    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    const mario = createPlayer(entityFactory.mario());

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);


    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const gameContext = {
        audioContext,
        entityFactory,
        deltaTime: null,
    };

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        camera.pos.x = Math.max(0, mario.pos.x - 100);

        level.comp.draw(context, camera);
    }

    timer.start();
    level.music.player.playTrack('main');
}

const canvas = document.getElementById('screen');

const start = () => {
    window.removeEventListener('click', start);
    main(canvas);
};

window.addEventListener('click', start);
