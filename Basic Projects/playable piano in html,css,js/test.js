const allkey = document.querySelectorAll(".key");

let validKey = [],
audio = new Audio(`tunes/a.wav`);

//adding addEventListener in each key
allkey.forEach((key)=>{
    validKey.push(key.dataset.key);
    key.addEventListener("click",()=>playAudio(key.dataset.key));
})

//play audio
const playAudio = (key) => {
    audio.src = `tunes/${key}.wav`
    audio.play();

    const clickedKey = document.querySelector(`[data-key=${key}]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

const pressedKey = (key) => {
    if(validKey.includes(key)){
        playAudio(key);
    }
}
document.addEventListener("keydown",(e)=>
pressedKey(e.key),
);