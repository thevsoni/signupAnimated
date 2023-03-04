let img1 = "https://images.unsplash.com/photo-1677830181821-cd489bfcc2bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
let img2 = "https://images.unsplash.com/photo-1670272501077-c72d2d42f362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
let img3 = "https://images.unsplash.com/photo-1670272498425-e13ce4fcf5f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

let currentIdx = 0;
let images = [img1, img2, img3];

let container = document.querySelector(".container");
let img = container.querySelector("img");
img.src = images[currentIdx];

let iconLeft = container.querySelectorAll("span")[0];
let iconRight = container.querySelectorAll("span")[1];




iconLeft.addEventListener("click", () => {
    currentIdx--;

    console.log("left");
    console.log(currentIdx);
    console.log(iconLeft);


    if (currentIdx < 0) {
        currentIdx = 2;
    }
    img.src = images[currentIdx];

})

iconRight.addEventListener("click", () => {
    currentIdx++;


    if (currentIdx > 2) {
        currentIdx = 0;
    }
    img.src = images[currentIdx];
})