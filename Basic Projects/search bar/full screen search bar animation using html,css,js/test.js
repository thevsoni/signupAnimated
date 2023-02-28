const searchBtn = document.querySelector(".search-btn");
const closeBtn = document.querySelector(".close-btn");
const wrapper = document.querySelector(".wrapper");
const searchdata = document.querySelector(".search-data");
const line = document.querySelector(".search-data .line");
const span = document.querySelector(".search-data span");
const label = document.querySelector(".search-data label");
const input = document.querySelector("input");
console.dir(searchBtn);

searchBtn.addEventListener("click",()=>{
    wrapper.classList.add("active");
    searchBtn.style.display="none";
    line.classList.add("active");
    closeBtn.style.display="block";
    span.style.display="block";
    label.style.display="block";
    searchdata.style.display="block";
    input.focus();
});
closeBtn.addEventListener("click",()=>{
    wrapper.classList.remove("active");
    line.classList.remove("active");
    closeBtn.style.display="none";
    span.style.display="none";
    label.style.display="none";
    searchdata.style.display="none";
    setTimeout(()=>{
        searchBtn.style.display="block";
    },500);
})