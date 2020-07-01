import Trait from '../Trait.js';

const MARK = Symbol('level timer earmark');

export default class LevelTimer extends Trait {
    static EVENT_TIMER_HURRY = Symbol('timer hurry');
    static EVENT_TIMER_OK = Symbol('timer ok');

    constructor() {
        super();
        this.totalTime = 400;
        this.currentTime = this.totalTime;
        this.hurryTime = 100;
        this.hurryEmitted = null;
    }

    reset() {
        this.currentTime = this.totalTime;
    }

    update(entity, {deltaTime}, level) {
        this.currentTime -= deltaTime * 2.5;

        if (!level[MARK]) {
            this.hurryEmitted = null;
        }

        if (this.hurryEmitted !== true && this.currentTime < this.hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_HURRY);
            this.hurryEmitted = true;
        }
        if (this.hurryEmitted !== false && this.currentTime > this.hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_OK);
            this.hurryEmitted = false;
        }

        level[MARK] = true;
    }
}
