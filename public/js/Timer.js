export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = null;

        this.updateProxy = (time) => {
            if (lastTime) {
                accumulatedTime += (time - lastTime) / 1000;

                if (accumulatedTime > 1) {
                    accumulatedTime = 1;
                }

                while (accumulatedTime > deltaTime) {
                    this.update(deltaTime);
                    accumulatedTime -= deltaTime;
                }
            }

            lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}
