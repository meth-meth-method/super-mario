import Compositor from './Compositor.js';
import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.tiles = new Matrix();
        this.entities = new Set();
    }
}
