const func = async () =>{
    try {
        const responce = await fetch("https://jsonplaceholder.typicode.com/posts");
        if(responce.status>=200 && responce.status<300){
            console.log("yes");
        }
        else{
            console.log("no");
        }
    } catch (error) {
        console.log("some error");
    }
}
func();
