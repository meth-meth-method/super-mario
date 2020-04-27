import Scene from "../Scene.js";

export default class CompositionScene extends Scene {
    constructor() {
        super();
        this.layers = [];
        this.countDown = 2;
    }

    update(gameContext) {
        const videoContext = gameContext.videoContext;
        videoContext.fillRect(0, 0, videoContext.canvas.width, videoContext.canvas.height);
        for (const layer of this.layers) {
            layer(videoContext);
        }
        this.countDown -= gameContext.deltaTime;
        if (this.countDown <= 0) {
            this.events.emit(Scene.EVENT_COMPLETE);
        }
    }
}
