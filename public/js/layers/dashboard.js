export function createDashboardLayer(font) {
    return function drawDashboardLayer(context) {
        font.print("MARIO", context, 16, 8);
        font.print("TIME", context, 208, 8);
    };
}
