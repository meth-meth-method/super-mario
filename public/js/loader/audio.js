import {loadJSON} from '../loader.js';
import AudioBoard from '../audioBoard.js';


export async function loadAudioBoard(name,audioContext){
    const loadAudio = await createAudioLoader(audioContext);
    const audioBoard = new AudioBoard(audioContext);

    return loadJSON(`./sounds/${name}.json`)
    .then(audioSheet=>{
        const fx = audioSheet.fx;
        const jobs = [];

        Object.keys(fx).forEach(animal=>{
            const url = fx[animal].url;
            console.log(animal,url);

            const job = loadAudio(url)
            .then(buffer=>{
                audioBoard.addAudio(animal,buffer);
                return buffer;
            });

            jobs.push(job);
            

        });
        //scope of following then include audioboard above
        return Promise.all(jobs).then((jobs)=>audioBoard);

});

}

function createAudioLoader(context){
    return function loadAudio(url){
        return fetch(url)
        .then(response=>{
            return response.arrayBuffer();
        })
        .then(arrayBuffer=>{
            return context.decodeAudioData(arrayBuffer);
        })
    }
}
