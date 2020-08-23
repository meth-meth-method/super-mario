export function drawWaitLayer(font,level){
    function getPlayerInfo(){
        let entity_arr = level.entities.values();
        let entity = entity_arr.next().value;

        while(true){
            if(entity.name =='mario'){
                break;
            }
            entity = entity_arr.next().value;
        }
        
        let time = entity.playerController.playerTime;
        let score = entity.playerController.score;
        let coin = entity.playerController.coin;
        let lives = entity.playerController.lives;
        return [time,score,coin,lives];

    }
    return function drawWaitLayer(context,camera){  
        const size = font.size;
        let lives = getPlayerInfo()[3];

        font.print('World   X',context, size*20, size*13);
        //font.print('@ X '+coin.toString().padStart(2,0),context,size*18, size*15); 
        font.print('Life x'+lives.toString().padStart(3," "),context,size*20, size*16);  
        
         
       
    }
}