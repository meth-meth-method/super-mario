import {findPlayers} from "../player.js";

function getPlayer(level) {
    for (const entity of findPlayers(level)) {
        return entity;
    }
}

export function createWaitScreenRenderer(font) {
    const avatarBuffer = document.createElement('canvas');
    avatarBuffer.width = 32;
    avatarBuffer.height = 32;

    const avatarContext = avatarBuffer.getContext('2d');

    return function createWaitScreenLayer(level) {
        const entity = getPlayer(level);
        avatarContext.clearRect(0, 0, avatarBuffer.height, avatarBuffer.width);
        entity.draw(avatarContext);

        return function drawWaitScreen(context) {
            font.print('WORLD ' + level.name, context, 8 * 12, 8 * 12);
            font.print('x ' + entity.player.lives.toString().padStart(3, ' '), context, 8 * 16, 8 * 16);
            context.drawImage(avatarBuffer, 8 * 12, 8 * 15);
        };
    };
};
