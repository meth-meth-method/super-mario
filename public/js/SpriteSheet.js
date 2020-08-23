export default class SpriteSheet {

    constructor(image,width,height){
        this.image =image;
        this.width =width;
        this.height=height;
        this.animation = new Map();
        this.tiles = new Map();// Map is a collection of elements where each element is stored as a Key, value pair. 
    }

    //method to subset tile and save it
    define(name,x_subset,y_subset,width,height){
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;

        buffer.getContext('2d').drawImage(
            this.image, 
            x_subset, y_subset, 
            width, height,
            0,0,
            width,height);

        //add name, butter as key, value pair into Map using map.set method
        this.tiles.set(name,buffer);
    }
    
    defineTile(name,x,y){
        this.define(
            name,
            x * this.width, 
            y * this.height,
            this.width,
            this.height);
    }


    draw(name, context, colIndex, rowIndex){
        const buffer = this.tiles.get(name);
        context.drawImage(buffer,colIndex, rowIndex);
    }

    drawTile(name,context,colIndex,row_index){
        this.draw(name, context, colIndex * this.width, row_index * this.height);
    }

    defineAnim(name, animation_function){
        this.animation.set(name,animation_function);
    }


    drawAnime(name,context, colIndex, row_index, distance){
        const animation_function = this.animation.get(name);
        this.drawTile(animation_function(distance),context, colIndex, row_index);
    }
}



