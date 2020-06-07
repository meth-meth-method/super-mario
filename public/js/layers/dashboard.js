import Player from "../traits/Player.js";
import LevelTimer from "../traits/LevelTimer.js";
import {findPlayers} from "../player.js";

function getPlayer(entities) {
    for (const entity of findPlayers(entities)) {
        return entity;
    }
}

export function createDashboardLayer(font, level) {
    const LINE1 = font.size * 2;
    const LINE2 = font.size * 3;

    return function drawDashboard(context) {
        const entity = getPlayer(level.entities);
        const playerTrait = entity.traits.get(Player);
        const timerTrait = entity.traits.get(LevelTimer);

        font.print(playerTrait.name, context, 24, LINE1);
        font.print(playerTrait.score.toString().padStart(6, '0'), context, 24, LINE2);

        font.print('×' + playerTrait.coins.toString().padStart(2, '0'), context, 96, LINE2);

        font.print('WORLD', context, 144, LINE1);
        font.print(level.name, context, 152, LINE2);

        font.print('TIME', context, 200, LINE1);
        font.print(timerTrait.currentTime.toFixed().toString().padStart(3, '0'), context, 208, LINE2);
    };
}
