export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.frameId = null;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        this.frameId = requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    listenTo(window) {
        window.addEventListener('blur', () => {
            this.stop();
        });
    }
}
