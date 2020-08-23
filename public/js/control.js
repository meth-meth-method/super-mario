
export function setMouseControl(canvas, entity, camera) {


    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {

            //if mouse click on context, event.button===1 
            if (event.buttons === 1) {
                entity.velocity.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            
            } 
          
        });
    });

    // canvas.addEventListener('contextmenu', event => {
    //     event.preventDefault();
    // });
}