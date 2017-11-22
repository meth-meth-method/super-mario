export function createDashboardLayer(font) {
    return function drawDashboardLayer(context) {
        font.draw("M", context, 0, 0);
        font.draw("A", context, 8, 0);
        font.draw("R", context, 16, 0);
        font.draw("I", context, 24, 0);
        font.draw("O", context, 32, 0);

    };
}
