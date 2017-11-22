export function createDashboardLayer(font, playerEnv) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 32;
    const bufferContext = buffer.getContext('2d');

    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    const score = 1234;

    font.print("MARIO", bufferContext, 16, LINE1);
    font.print("WORLD", bufferContext, 152, LINE1);
    font.print("1-1", bufferContext, 160, LINE2);
    font.print("TIME", bufferContext, 208, LINE1);

    return function drawDashboardLayer(context) {
        const time = playerEnv.playerController.time.toFixed();

        font.print(score.toString().padStart(6, "0"), context, 16, LINE2);
        font.print(time.toString().padStart(3, "0"), context, 216, LINE2);

        context.drawImage(buffer, 0, 0);
    };
}
