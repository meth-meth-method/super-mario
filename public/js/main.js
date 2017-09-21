function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

class SpriteSheet {
    constructor(image, w = 16, h = 16) {
        this.image = image;
        this.width = w;
        this.height = h;
        this.tiles = new Map();
    }

    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.height = this.height;
        buffer.width = this.width;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                this.width * x,
                this.height * y,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height);
        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillStyle = 'black';
context.fillRect(0, 0, 100, 100);

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 64, 32);

    context.drawImage(image, 0, 0, 16, 16, 32, 32, 16, 16);
});
