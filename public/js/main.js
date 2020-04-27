import SceneRunner from './SceneRunner.js';
import Level from './Level.js';
import CompositionScene from './scenes/CompositionScene.js';
import LevelScene from './scenes/LevelScene.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {createPlayer, createPlayerEnv} from './player.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardRenderer} from './layers/dashboard.js';
import {createWaitScreenRenderer} from './layers/wait-screen.js';
import Player from './traits/Player.js';
import InputRouter from './InputRouter.js';

async function main(canvas) {
    const videoContext = canvas.getContext('2d');
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont(),
    ]);

    const createDashboardLayer = createDashboardRenderer(font);
    const createWaitScreenLayer = createWaitScreenRenderer(font);

    const marioPlayer = new Player();
    marioPlayer.name = 'MARIO';

    const mario = entityFactory.mario();
    mario.addTrait(marioPlayer);

    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    const loadLevel = await createLevelLoader(entityFactory);

    const sceneRunner = new SceneRunner();

    async function loadScene(name) {
        const level = await loadLevel(name);

        mario.pos.set(0, 0);
        mario.vel.set(0, 0);
        level.entities.add(mario);

        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);

        const dashboardLayer = createDashboardLayer(level);
        const waitScreenLayer = createWaitScreenLayer(level);

        level.comp.layers.push(createCollisionLayer(level));
        level.comp.layers.push(dashboardLayer);

        level.events.listen(Level.EVENT_GOTO_SCENE, sceneName => {
            runScene(sceneName);
        });

        const loadScreenScene = new CompositionScene();
        loadScreenScene.layers.push(dashboardLayer);
        loadScreenScene.layers.push(waitScreenLayer);
        sceneRunner.addScene(loadScreenScene);

        const levelScene = new LevelScene(level);
        sceneRunner.addScene(levelScene);

        sceneRunner.runNext();
    }

    function runScene(name) {
        loadScene(name);
    }

    const gameContext = {
        audioContext,
        videoContext,
        entityFactory,
        deltaTime: null,
    };

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime;
        sceneRunner.update(gameContext);
    }

    timer.start();

    runScene('debug-progression')
}

const canvas = document.getElementById('screen');

const start = () => {
    window.removeEventListener('click', start);
    main(canvas);
};

window.addEventListener('click', start);
