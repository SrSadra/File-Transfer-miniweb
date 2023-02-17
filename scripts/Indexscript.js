console.log("alo");
document.getElementById("sub").addEventListener("click" , (e) => {
    console.log("mamad");
    fetch("/" , {
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify({
            password : document.getElementById("passInp").value,
            upFile : document.getElementById("fileInp").value,  
            nameFile : document.getElementById("fileInp").files[0].name,
        }),
        dataType : "json"
    }).then((res) => {
        console.log("daush");
        if (res.ok){
            console.log("succsess");
            return;
        }
        else {
            console.log("error occured");
            throw new error("button error has occured")
        }
    }).catch((err) => {
        console.log("here");
        console.log(err);
    })
})