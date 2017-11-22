export function createDashboardLayer(font) {
    const LINE1 = font.size * 1;

    return function drawDashboardLayer(context) {
        font.print("MARIO", context, 16, LINE1);
        font.print("WORLD", context, 152, LINE1);
        font.print("TIME", context, 208, LINE1);
    };
}
