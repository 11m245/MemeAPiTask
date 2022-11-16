let filteredArray,foundObj;
var apidata ;

let promise= fetch("https://api.imgflip.com/get_memes").then(res=>res.json());
promise.then(data=>storeapi(data));

function storeapi(data){
    apidata = data;
    // console.log(apidata);
    // console.log(apidata.data.memes);
}

function displayNames(){
    var alreadyAppended=document.getElementsByClassName("rac");
 if(alreadyAppended){
       for(let ele of alreadyAppended){
         ele.remove();
     }
 }
    searchvalue=document.getElementById("searchvalue").value;
    // console.log("searched for",searchvalue);
    
    filteredArray= apidata.data.memes.filter(memeobj=>memeobj.name.toLowerCase().indexOf(searchvalue.toLowerCase())>-1);

    // console.log(filteredArray);

    let nameContainerEl=document.createElement("div");
    nameContainerEl.classList.add("container","rac");

    let headEl=document.createElement("h3");
    headEl.innerText=`Please select any matching Meme of your search`;
    nameContainerEl.append(headEl);

    let buttonContainerEl=document.createElement("div");
    buttonContainerEl.classList.add("container","d-flex","flex-wrap");

    for( let i=0;i<filteredArray.length;i++){
        let buttonEl=document.createElement("button");
        buttonEl.style="height:28px";
        buttonEl.setAttribute("id",`${filteredArray[i].id}`);
        buttonEl.addEventListener("click",displayMeme);
        buttonEl.classList.add("btn","m-2","p-0","px-1");
        buttonEl.classList.add("align-self-start");
        let style = i%2===0? "btn-success" : "btn-primary"
        buttonEl.classList.add(style);
        buttonEl.innerText=`${filteredArray[i].name}`;
        buttonContainerEl.append(buttonEl);
    }
    nameContainerEl.append(buttonContainerEl);
    document.body.append(nameContainerEl);

}

function displayMeme(event){
    // console.log("clicked id",event.target.id);
    
    let memeContainerEl=document.createElement("div");
    memeContainerEl.classList.add("meme-container");
    memeContainerEl.style="width:400px; height:450px;";

    memeContainerEl.classList.add("border","border-primary","mt-2","mx-auto","rac");

   
    let imgEl=document.createElement("img");
    imgEl.setAttribute("src",findImageUrl(event.target.id));
    imgEl.style="max-width:100%; max-height:100%"; 
    
    let memeNameEl= document.createElement("h4");
    memeNameEl.innerText=`${foundObj["name"]}`;
    memeNameEl.classList.add("text-center","mx-auto");
    memeContainerEl.append(memeNameEl);

    memeContainerEl.append(imgEl);


    var alreadyAppended=document.getElementsByClassName("rac");
    if(alreadyAppended){
          for(let ele of alreadyAppended){
            ele.remove();
        }
    }

   document.body.append(memeContainerEl);
}


function findImageUrl(id){    

    let foundArr=filteredArray.filter(obj=>obj.id===id);
    foundObj=foundArr[0];
    // console.log("foundobj is", foundObj);
    // console.log("foundobj url is", foundObj.url);
    return foundObj.url;
}