import Trait from '../Trait.js';

export default class LevelTimer extends Trait {
    static EVENT_TIMER_HURRY = Symbol('timer hurry');
    static EVENT_TIMER_OK = Symbol('timer ok');

    constructor() {
        super();
        this.totalTime = 300;
        this.currentTime = this.totalTime;
        this.hurryTime = 100;
        this.hurryEmitted = null;
    }

    update(entity, {deltaTime}, level) {
        this.currentTime -= deltaTime * 2;
        if (this.hurryEmitted !== true && this.currentTime < this.hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_HURRY);
            this.hurryEmitted = true;
        }
        if (this.hurryEmitted !== false && this.currentTime > this.hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_OK);
            this.hurryEmitted = false;
        }
    }
}
