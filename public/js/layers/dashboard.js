export function createDashboardLayer(font) {
    return function drawDashboardLayer(context) {
        font.draw("M", context, 0, 0);
        font.draw("A", context, 8, 0);

    };
}
