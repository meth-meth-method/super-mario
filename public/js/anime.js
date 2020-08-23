export function createAnime(frames,frameLen){
    //distance in the animaiton, not in the context
    return function resolveFrame(distance){
       
        const index = Math.floor(Math.abs(distance)/frameLen) % frames.length;
        const animation_name = frames[index];
        return animation_name;
    };
}