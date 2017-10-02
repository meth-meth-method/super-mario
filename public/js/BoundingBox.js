export default class BoundingBox {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    get bottom() {
        return this.pos.y + this.size.y;
    }

    set bottom(y) {
        this.pos.y = y - this.size.y;
    }

    get top() {
        return this.pos.y;
    }

    set top(y) {
        this.pos.y = y;
    }

    get left() {
        return this.pos.x;
    }

    set left(x) {
        this.pos.x = x;
    }

    get right() {
        return this.pos.x + this.size.x;
    }

    set right(x) {
        this.pos.x = x - this.size.x;
    }
}
