export function createCollisionLayer(level){

    const resolvedTiles = [];
    const tileResolver = level.tileCollider.tile_resolver[0];
    
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getTileByIndex;

    // and let "this" pointing to tileResolver inside level
    // rewrite tileResolver.getTileByIndex by adding one command
    tileResolver.getTileByIndex = function getByIndexFake(col_index, row_index) {
        resolvedTiles.push({col_index, row_index});
        return getByIndexOriginal.call(this, col_index, row_index);
    }
    //**for the  tile resolver inside level instance, it has two properties, matrix and tile size, and the method*//
    //**this new method tileResolver.getTileByIndex, adds a array command*//
    //**it also overwrite original tileResolver.getTileByIndex by pointing to this resolver(collison grid)*/

    const drawEntityBounding = drawEntityBounding_higherLevel(resolvedTiles,tileSize);
    const drawCollisionBounding =createCollisionLayer_higherLevel(level);

    return function drawCollisionLayer(context,camera){
        drawEntityBounding(context,camera);
        drawCollisionBounding(context,camera);
    }
   
}

function drawEntityBounding_higherLevel(resolvedTiles,tileSize){
    return function drawEntityBounding(context,camera){
        resolvedTiles.forEach(({col_index, row_index}) => {
            context.strokeStyle = 'blue';
            
            context.beginPath();
            context.rect(
                col_index * tileSize - camera.pos.x,
                row_index * tileSize - camera.pos.y,
                tileSize, 
                tileSize);
            context.stroke();
        });
        //clean up blue lines for next call
        resolvedTiles.length = 0;

    }
}

function createCollisionLayer_higherLevel(level){
    return function drawCollisionBounding(context,camera){

        //draw lines around entities
        level.entities.forEach(entity=>{
            context.strokeStyle = 'red';
            context.beginPath();
            context.rect(entity.bounds.left- camera.pos.x,
                entity.bounds.top - camera.pos.y,
                entity.size.x,
                entity.size.y);
            context.stroke();

        })

    }
}
