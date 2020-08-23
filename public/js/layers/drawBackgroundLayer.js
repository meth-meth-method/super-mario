import TileResolver from '../tileResolver.js';


export function getBackgroundLayer(level,backgroundGrid,background_sprites){

    const resolver = new TileResolver(backgroundGrid); //new resolver not inside level
    
    const buffer = document.createElement('canvas');
    buffer.width = 440;
    buffer.height = 240;
    const buffer_context = buffer.getContext('2d');
    // whole image is stored in buffer_context api

    function drawBufferBasedOnCamera(startIndex,endIndex){
        //clear buffer whenever update
        buffer_context.clearRect(0,0,buffer.width,buffer.height);
        //iterating backgroundGrid according to column index and draw according tiles based on name
        for(let colIndex =startIndex; colIndex<=endIndex; colIndex++){
            const col = backgroundGrid.grid[colIndex];
  
            if(col){
                col.forEach((value,rowIndex)=>{
       
                    
                    if(value.name ==='chance' || value.name ==='coin'){
                        background_sprites.drawAnime(value.name,buffer_context,colIndex-startIndex,rowIndex,level.duration);
                    }else{
                         //be careful, here you need to substruct startIndex, because you draw all background from position ,colIndex-startIndex
                        //such that you can make image colIndex to show on (0,0) on buffer.
                        background_sprites.drawTile(value.name,buffer_context,colIndex-startIndex,rowIndex);
                    }
                   
                });
            }
        }
    }
 
    //substract image from the whole imaged stored in buffer according to camera position
    return function drawOnContext_background(context,camera){
        const drawWidth = resolver.toTileIndex(camera.size.x);
        const drawfrom = resolver.toTileIndex(camera.pos.x);
        const drawTo = drawfrom + drawWidth;
 
        drawBufferBasedOnCamera(drawfrom,drawTo);
        //draw buffer on context
        //%16 to avoid running out of context, the starting drawing positionx always between 0 and 16
        //choose 16 is because each tile size is 16, only redraw after moving 16 pixles, making graph consistent
        context.drawImage(buffer,
            -camera.pos.x%16,
            -camera.pos.y);
    }
}
