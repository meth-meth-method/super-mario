export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.frameId = null;
        this.speed = 1;

        this.updateProxy = (time) => {
            accumulatedTime += ((time - lastTime) / 1000) * this.speed;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

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
}
