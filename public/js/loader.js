import SpriteSheet from './SpriteSheet.js';
import {createAnime} from './anime.js';


export function loadImage(url){
    //return a correct object
    return new Promise((resolve,reject) =>{
        // this line of code run first
        console.log('creating image...');
        const image = new Image();

        // this line of code run second
        console.log('loading image...');
        image.src=url;

        //return resolved image after loading event resolved
        image.addEventListener('load',()=>{
            console.log('resolving images...');
            resolve(image);
        });

        image.addEventListener('error', () => {
            console.log('rejecting images...');
            reject(new Error(`Failed to load image's URL: ${url}`));
  
       });
        
    });
}

export function loadJSON(url){
    return fetch(url)  //return a promise object
    .then(r=>r.json());  //read that object as json file 
    //and return A Promise that resolves to a JavaScript object.

}


export function loadSpriteSheet(name) {
    return loadJSON(`./sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => { 

        const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH);
        //store name, and buffer in sprite.tiles key value pairs, so can be drawn on context later

        if(sheetSpec.tiles){
            sheetSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(
                    tileSpec.name,
                    tileSpec.index[0],
                    tileSpec.index[1]);
            });    
        }
        if(sheetSpec.animations){
            
            sheetSpec.animations.forEach(animation=>{
                const animation_function = createAnime(animation.frames,animation.frameLen);
                sprites.defineAnim(animation.name, animation_function);
            });
        }

        if(sheetSpec.frames){
            sheetSpec.frames.forEach(frame=>{
                sprites.define(frame.name, ...frame.rect) 
                // spread operator [frame.rect[0],frame.rect[1],frame.rect[2],frame.rect[3]]
            });
        }
        
        
        return sprites;  //a promise, resolved value is this value inside next then method
    });
}

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

export function loadFont() {
    return loadImage('./image/font.png')
    .then(image => {
        const fontSprite = new SpriteSheet(image);

        const size = 8;
        const rowLen = image.width;
        for (let [index, char] of [...CHARS].entries()) {
            const xIndex = index * size % rowLen;
            const yIndex = Math.floor(index * size / rowLen) * size;
            fontSprite.define(char, xIndex, yIndex, size, size);
        }

       return new Font(fontSprite,size); 
    });
}

class Font{
    constructor(sprite,size){
        this.sprite = sprite;
        this.size =size;
    }

    print(chars,context,xpos,ypos){
        [...chars].forEach((char,indexOfthisChars)=>{
            this.sprite.draw(char,context,xpos + this.size*indexOfthisChars, ypos)
        }
    )};
}