import BoundingBox from './BoundingBox.js';
import {Vec2} from './math.js';

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
    }
}
