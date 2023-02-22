const btn = document.getElementsByClassName("btn")[0];
h3 = document.getElementById("h3");
const enter = async () =>{
    try {
        const responce = await fetch("https://jsonplaceholder.typicode.com/posts");
        if(responce.status>=200 && responce.status<300){
            console.log("u r connected to internet ");
            // newElement = document.createElement("h3");
            
            h3.innerHTML = "u r connected to internet ";
        }
        else{
            console.log("not connected bro, pls connect");
            newElement = document.createElement("h3");
            h3.innerHTML = "not connected bro, pls connect";
        }
        
    } catch (error) {
            console.log("not connected bro, pls connect");
            newElement = document.createElement("h3");
            h3.innerHTML = "not connected bro, pls connect";
    }
    return "";
}
btn.addEventListener("click",()=>{
    h3.innerHTML = "";
    enter().then(()=>{
       
        setTimeout(() => {
            let askAgain = confirm("do u want to erase our answer to check again ?")
                if(askAgain){
                    h3.innerHTML = "";
                }
        }, 2000);
    })
    
})



// let intervalId = setInterval(() => {
//     enter();
// }, 3000);