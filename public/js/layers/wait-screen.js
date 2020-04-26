import {findPlayers} from "../player.js";

function getPlayer(level) {
    for (const entity of findPlayers(level)) {
        return entity;
    }
}

export function createWaitScreenRenderer(font) {
    const buffer = document.createElement('canvas');
    buffer.width = 32;
    buffer.height = 32;

    const avatarContext = buffer.getContext('2d');

    return function createWaitScreenLayer(level) {
        const entity = getPlayer(level);
        entity.draw(avatarContext);

        return function drawWaitScreen(context) {
            font.print('WORLD ' + level.name, context, 8 * 12, 8 * 12);
            font.print('x ' + entity.player.lives.toString().padStart(3, ' '), context, 8 * 16, 8 * 16);
            context.drawImage(buffer, 8 * 12, 8 * 15);
        };
    };
};
