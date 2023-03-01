// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");

let userArr = [];
inputBox.onkeyup = (e) => {
    let userData = e.target.value;

    if (userData) {
        icon.onclick = () => {
            linkTag.href = `https://www.google.com/?=${userData}`;
            linkTag.click();
        }
        userArr = test2.filter((dataa) = {
            return dataa.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
        });
    }
}