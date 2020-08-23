export function expandTiles(tiles,patterns){

    const expandedTiles = []; // names and x, y position
    function walkTiles(tiles,offsetX,offsetY){
        tiles.forEach(tile=>{
            tile.ranges.forEach(([x1,xlen,y1,ylen])=>{
               // for of loop
                for(const {x,y} of expandSpan(x1,xlen,y1,ylen)){
                    const derivedX = x + offsetX;
                    const derivedY = y + offsetY;
                    if(tile.pattern){ 
                        const background_tile = patterns[tile.pattern].tiles;

                        walkTiles(background_tile,x,y);
                    }else{
                        //key names
                        expandedTiles.push({
                            "tile":tile,
                            "colIndex":derivedX,
                            "rowIndex":derivedY
                        });
                        
                        // level.tiles_matrix.set(derivedX,derivedY,{
                        //     name: tile.name,
                        //     type: tile.type
                        // });
                    }
                }
            });
            
        });

    }
    
    walkTiles(tiles,0,0);

    return expandedTiles;
}

// it can be changed into generator function
// function expandSpan(x1,xlen,y1,ylen){
//     const x2 = x1 + xlen;
//     const y2 = y1 + ylen;
//     const coord =[];

//     for(let x=x1; x<x2; x++){
//         for(let y=y1; y<y2;y++){
//             coord.push({x,y});
//         }
//     }
//     return coord;
// }

function* expandSpan(x1,xlen,y1,ylen){
    const x2 = x1 + xlen;
    const y2 = y1 + ylen;

    for(let x=x1; x<x2; x++){
        for(let y=y1; y<y2;y++){
            yield{x,y};
        }
    }
   
}



