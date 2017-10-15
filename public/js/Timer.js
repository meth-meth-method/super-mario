export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.frameId = null;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            if (accumulatedTime > 0.5) {
                console.log(
                    'Accumulated Time: ', accumulatedTime,
                    'Simulation Cycles Behind', accumulatedTime / deltaTime);
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

    listenTo(window) {
        window.addEventListener('blur', () => {
            this.stop();
        });

        window.addEventListener('focus', () => {
            this.start();
        });
    }
}
