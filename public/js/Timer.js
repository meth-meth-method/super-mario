export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        this.lastTime = null;
        this.frameId = null;

        this.updateProxy = (time) => {
            if (this.lastTime !== null) {
                accumulatedTime += (time - this.lastTime) / 1000;

                if (accumulatedTime > 0.5) {
                    console.log(
                        'Accumulated Time: ', accumulatedTime,
                        'Simulation Cycles Behind', accumulatedTime / deltaTime);
                }

                while (accumulatedTime > deltaTime) {
                    this.update(deltaTime);
                    accumulatedTime -= deltaTime;
                }
            }

            this.lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        this.frameId = this.window.requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }

    stop() {
        this.lastTime = null;
        this.window.cancelAnimationFrame(this.frameId);
    }

    listenTo(window) {
        this.window = window;

        this.window.addEventListener('blur', () => {
            this.stop();
        });

        this.window.addEventListener('focus', () => {
            this.start();
        });
    }
}
