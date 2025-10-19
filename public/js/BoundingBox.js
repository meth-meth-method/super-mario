import { Vec2 } from "./math.js";

export default class BoundingBox {
    constructor(pos, size, offset) {
        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    overlaps(box) {
        return this.bottom > box.top
            && this.top < box.bottom
            && this.left < box.right
            && this.right > box.left;
    }

    getCenter() {
        return new Vec2(this.meridian, this.equator);
    }

    setCenter(vec2) {
        this.meridian = vec2.x;
        this.equator = vec2.y;
    }

    get meridian() {
        return this.pos.x + this.offset.x + this.size.x / 2;
    }

    set meridian(c) {
        this.pos.x = c - (this.size.x / 2 + this.offset.x);
    }

    get equator() {
        return this.pos.y + this.offset.y + this.size.y / 2;
    }

    set equator(c) {
        this.pos.y = c - (this.size.y / 2 + this.offset.y);
    }

    get bottom() {
        return this.pos.y + this.size.y + this.offset.y;
    }

    set bottom(y) {
        this.pos.y = y - (this.size.y + this.offset.y);
    }

    get top() {
        return this.pos.y + this.offset.y;
    }

    set top(y) {
        this.pos.y = y - this.offset.y;
    }

    get left() {
        return this.pos.x + this.offset.x;
    }

    set left(x) {
        this.pos.x = x - this.offset.x;
    }

    get right() {
        return this.pos.x + this.size.x + this.offset.x;
    }

    set right(x) {
        this.pos.x = x - (this.size.x + this.offset.x);
    }
}
