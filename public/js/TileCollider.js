import TileResolver from './tileResolver.js';
import { ground } from '../tiles/ground.js';
import { coin } from '../tiles/coin.js';
import { chance } from '../tiles/chance.js';
import { mushroom } from '../tiles/mushroom.js';


const tileTypes = {
    coin,
    ground,
    chance,
    mushroom,
}



export default class TileCollider{
    constructor(){
        this.tile_resolver = [];
    }

    addGrid(tileMatrix){
        this.tile_resolver.push(new TileResolver(tileMatrix));

    }


    test(entity){
        this.checkY(entity);
        this.checkX(entity); 
       
    }

    handle(index,match,entity,resolver){

        const tileCollisionContext = {
            match,
            entity,
            resolver,
        };


        const tileType = tileTypes[match.tile.type];
        if (tileType) {
            tileType[index](tileCollisionContext);
        }

    }

    checkX(entity){
        let x;
        if(entity.velocity.x>0){
            x=entity.bounds.right;

        }else if(entity.velocity.x<0){
            x=entity.bounds.left;
            
        }else{
            return;
        }
             
        
        for (let resolver of this.tile_resolver){

            const matchedTilesIndex = resolver.getTileByRange(
                x, x,
                entity.bounds.top, entity.bounds.bottom);

            matchedTilesIndex.forEach(match=>{         
                this.handle(0, match,entity,resolver);
              
            });

        }  
        
    }

    checkY(entity){
        let y;
        if(entity.velocity.y>0){
            y=entity.bounds.bottom;
        }else if(entity.velocity.y<0){
            y=entity.bounds.top;

        }

        for (let resolver of this.tile_resolver){
            const matchedTiles = resolver.getTileByRange(
                entity.bounds.left, entity.bounds.right,
                y,y);
            
            matchedTiles.forEach(match=>{
                this.handle(1, match,entity,resolver);

            });
      
        }    
    }

}