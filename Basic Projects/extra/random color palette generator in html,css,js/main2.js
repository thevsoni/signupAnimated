const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-btn");

const maxPaletteBoxes = 32;

const generatePalette = () =>{
    container.innerHTML = ""; //at the refresh time ,it is called ,so need to clear all previous things
    for(let i=0; i<maxPaletteBoxes; i++){
        //firstly it will get random value b/w 0 and 1 then multiply with max hax value then make this 
        //hexadecimal 
        let randomHex = Math.floor(Math.random()*0xffffff).toString(16);
        //if size of randomhex is less than 6 then add 0 at first position until its size become 6
        randomHex = `#${randomHex.padStart(6,"0")}`;

        let colorBox = document.createElement("li");
        colorBox.classList.add("mainBox");
        colorBox.innerHTML = `<div class="mainBoxChild1" style="background:${randomHex}"></div>
                              <span class="mainBoxChild2">${randomHex}</span>`
        colorBox.addEventListener("click",()=>{
            copyColorName(colorBox,randomHex);
        });        
        container.appendChild(colorBox);              
    }
}
generatePalette();

const copyColorName = (colorBox,randomHex) =>{
    let mainBoxChild2 = colorBox.querySelector(".mainBoxChild2");
    navigator.clipboard.writeText(randomHex).then(()=>{
        mainBoxChild2.innerText = "Copied !";
        setTimeout(() => {
            mainBoxChild2.innerText = randomHex;
        }, 1000);
    }).catch(()=>{
        alert("not able to copy color code due to some error")
    })
}

// refreshBtn.addEventListener("click",generatePalette);
refreshBtn.addEventListener("click", ()=>{
    generatePalette();
});
