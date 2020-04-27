import Scene from "../Scene.js";

export default class LevelScene extends Scene {
    constructor(level) {
        super();
        this.level = level;
    }

    update(gameContext) {
        const level = this.level;
        level.update(gameContext);
        level.draw(gameContext);
    }

    end() {
        this.level.music.stop();
    }
}
