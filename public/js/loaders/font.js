import {loadImage} from '../loaders.js';
import SpriteSheet from '../SpriteSheet.js';

export function loadFont() {
    return loadImage('./img/font.png')
    .then(image => {
        const fontSprite = new SpriteSheet(image);

        fontSprite.define("A", 8, 16, 8, 8);

        return fontSprite;
    });
}
