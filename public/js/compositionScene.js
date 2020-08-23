import Compositor from './compository.js';
import EventEmitter from './eventEmitter.js';

export default class CompositionScene{

    constructor(){
        this.compo = new Compositor();
        this.events = new EventEmitter();

    }

    updateEntity(dt,audioContext){

    }

    static EventFinish = Symbol('EventFinish');
    static GameFinish= Symbol('GameFinish');

 
}