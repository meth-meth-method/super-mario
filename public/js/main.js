function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillStyle = 'black';
context.fillRect(0, 0, 100, 100);

loadImage('/img/tiles.png')
.then(image => {
    console.log(image);
});
