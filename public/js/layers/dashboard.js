export function createDashboardLayer(font) {
    return function drawDashboardLayer(context) {
        font.print("MARIO", context, 16, 8);
        font.print("WORLD", context, 152, 8);
        font.print("TIME", context, 208, 8);
    };
}
