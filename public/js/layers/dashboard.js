export function createDashboardLayer(font) {
    return function drawDashboardLayer(context) {
        font.print("MARIO", context, 0, 0);
    };
}
