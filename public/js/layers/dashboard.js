import {findPlayers} from "../player.js";

function getPlayerTrait(level) {
    for (const entity of findPlayers(level)) {
        return entity.player;
    }
}

function getTimerTrait(level) {
    for (const entity of level.entities) {
        if (entity.levelTimer) {
            return entity.levelTimer;
        }
    }
}

export function createDashboardLayer(font, level) {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    const playerTrait = getPlayerTrait(level);
    const timerTrait = getTimerTrait(level);

    return function drawDashboard(context) {
        font.print(playerTrait.name, context, 16, LINE1);
        font.print(playerTrait.score.toString().padStart(6, '0'), context, 16, LINE2);

        font.print('@x' + playerTrait.coins.toString().padStart(2, '0'), context, 96, LINE2);

        font.print('WORLD', context, 152, LINE1);
        font.print('1-1', context, 160, LINE2);

        font.print('TIME', context, 208, LINE1);
        font.print(timerTrait.currentTime.toFixed().toString().padStart(3, '0'), context, 216, LINE2);
    };
}
