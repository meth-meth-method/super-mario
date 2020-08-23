import Level from '../level.js';
import {getSpriteLayer} from '../layers/drawEntityLayer.js';
import {getBackgroundLayer,} from '../layers/drawBackgroundLayer.js';
import {createCollisionLayer} from '../layers/drawCollisionLayer.js';
import {expandTiles} from '../createTilesGrid.js';
import {loadJSON,loadSpriteSheet} from '../loader.js';
import Matrix from '../matrix.js';


//closure is created, loadlevel is the child function

export function createLoadLevel(entityFactory){
    //callback function is used for async processing
    return function loadLevel(name){

        return loadJSON(`./levels/${name}.json`)
        .then(levelFile=>{
            return Promise.all([
                levelFile,
                loadSpriteSheet(levelFile.spriteSheet),  //passing in overworld json file
           
            ]);
        })
        .then(([levelFile,BackGroundSprite])=>{
            
            const level = new Level();

            //load background layer
            pushBackgroundOnLevelCompo(levelFile,level,BackGroundSprite);

            
            //load koopa goomba entity layer
            pushEntitiesOnLevelCompo(levelFile,level,entityFactory);

           
            pushCollisionOnLevelCompo(levelFile,level);

            //pushFontOnLevelCompo(font,level);

        
            return level;

        });
    }
}




function createBackgroundGrid(tiles,patterns){
     
    const backgroundGrid = new Matrix();
    const expandedTiles=expandTiles(tiles,patterns);
    //tile,X,Y are values inside object
    for(const {tile,colIndex,rowIndex} of expandedTiles){
        backgroundGrid.set(colIndex,rowIndex,tile);
    }

    return backgroundGrid;
}

// function pushFontOnLevelCompo(font,level){
//     level.compo.layers.push(drawFont(font,level));

// }
function pushBackgroundOnLevelCompo(levelFile,level,BackGroundSprite){
    
    levelFile.layers.forEach(layer=>{
        //drawing background on context according to element's name and posiiton in matrix
        const backgroundGrid = createBackgroundGrid(layer.tiles,levelFile.patterns);
        const background_draw_function = getBackgroundLayer(level,backgroundGrid,BackGroundSprite);
        //level passed in as a timer
        //draw BackGroundSprite according to name on grid 
        //draw buffer on context
        //the returned background_draw_function only called when execute level.compo.layers
        //three background layers, each drawing at a different fime

        level.compo.layers.push(background_draw_function);
        level.tileCollider.addGrid(backgroundGrid);
        
    })
}


function pushEntitiesOnLevelCompo(levelFile,level,entityFactory){
    //entityFactory has mario,koopa and goomba entities
    //levelFile.entities has koopa and goomba
    levelFile.entities.forEach(({name, pos:[x,y]})=>{
        const createEntityFunc= entityFactory[name]; 
        const newEntity_object = createEntityFunc();
     
        newEntity_object.pos.set(x,y);
        //level contains entities
        level.entities.add(newEntity_object);
    })

    //entities are drawn on the context after calling level.compo.layers
    const draw_entity_function = getSpriteLayer(level.entities);
    level.compo.layers.push(draw_entity_function);
}


function pushCollisionOnLevelCompo(levelFile,level){
    //merge all tiles from all layers into the same layer
    const mergedTiles = levelFile.layers.reduce((mergedTiles,layer)=>{
        return mergedTiles.concat(layer.tiles); //return values goes back to mergedTiles, mergedTiles starts with []
    },[]);
    
    const collistionGrid = createBackgroundGrid(mergedTiles,levelFile.patterns);
    level.tileCollider.addGrid(collistionGrid);

    //level.setCollisionGrid(collistionGrid); 
    const draw_collision_function =createCollisionLayer(level);
    //level.compo.layers.push(draw_collision_function);
}

