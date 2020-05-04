export function createTextLayer(font, text) {
    const size = font.size;

    return function drawText(context) {
        const textW = text.length;
        const screenW = Math.floor(context.canvas.width / size);
        const x = screenW / 2 - textW / 2;
        const y = 12;
        font.print(text, context, x * size, y * size);
    };
}
