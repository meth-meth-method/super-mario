export function createDashboardLayer(font) {
    return function drawDashboardLayer(context) {
        font.draw("A", context, 0, 0);
    };
}
