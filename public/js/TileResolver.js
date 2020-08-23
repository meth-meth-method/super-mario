export default class TileResolver{
    constructor(matrix,tillSize=16){
        this.tileSize = tillSize;
        this.matrix = matrix;

    }
    toTileIndex(pos){
        return Math.floor(pos/this.tileSize);
    }

    toIndexRange(pos1,pos2){
        
        const position_max = Math.ceil(pos2/this.tileSize) * this.tileSize;
        const range =[];
        let pos =pos1;
        do{
            range.push(this.toTileIndex(pos));
            pos += this.tileSize;
        }while(pos<position_max);//higher not =<

        return range;
    }
    getTileByIndex(indexX,indexY){
        //console.log(this); this pointing to the tileresolver at collision layer
     
        const tile= this.matrix.get(indexX,indexY);
 
        if(tile){
            const y_cell= indexY * this.tileSize;
            const y_floor= y_cell + this.tileSize;
            const x_left = indexX * this.tileSize;
            const x_right = x_left + this.tileSize;

            return{
                tile,
                y_cell,
                y_floor,
                x_left,
                x_right,
                indexX,
                indexY
                
            };
        }
        
    }

    getTileByPosition(posX,posY){
        return this.getTileByIndex(
            this.toTileIndex(posX),
            this.toTileIndex(posY)
            );
    }

    getTileByRange(x1,x2,y1,y2){
      
        const matchedTiles=[];
        this.toIndexRange(x1,x2).forEach(indexX =>{
      
            this.toIndexRange(y1,y2).forEach(indexY=>{
                const matched = this.getTileByIndex(indexX,indexY);
                if(matched){
                    matchedTiles.push(matched);
                }
            });
        });
        return matchedTiles;

    }
}