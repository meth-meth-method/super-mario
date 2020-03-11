export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }

    delete(x, y) {
        const col = this.grid[x];
        if (col) {
            delete col[y];
        }
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}

export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }

    copy(vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
