export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(fn) {
        this.grid.forEach((col, x) => {
            col.forEach((tile, y) => {
                fn(tile, x, y);
            });
        });
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

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
