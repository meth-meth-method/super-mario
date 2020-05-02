export function createColorLayer(color) {
    return function drawColor(context) {
        context.fillStyle = color;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    };
}
