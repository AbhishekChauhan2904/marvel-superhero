

let heroId = JSON.parse(localStorage.getItem("heroId"));

let heroDetails = null;
let titleEle = document.getElementById("name");
let imgEle = document.getElementsByTagName("img")[0];
let description = document.getElementById("description");
let comics = document.getElementById("comics");
let series = document.getElementById("series");
let releaseDate = document.getElementById("release-data");
let seriesNumber = document.getElementById("seriesNumber");
let comicNumber = document.getElementById("comicNumber");
async function fetchHeroDetails(id){
    
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`);
    heroDetails =( await response.json()).data.results[0];
    console.log(heroDetails);
    if(heroDetails.description.length != 0)
    description.innerHTML += `<h2>${heroDetails.description}</h2>`;
    else
    description.innerHTML += `<h2>Description Not available</h2>`;
    titleEle.innerHTML +=`<h2> ${heroDetails.name} </h2>`;
    let date = `${heroDetails.modified}`
    let parsedDate = "";
    for(i of date){
        if(('0'  <= i && i <= '9') || i == '-')
            parsedDate += i;
        else break;
    }
    releaseDate.innerHTML +=  `<h2>${parsedDate}</h2>`;
    imgEle.setAttribute("src", `${heroDetails.thumbnail.path}.${heroDetails.thumbnail.extension}`);
    seriesNumber.innerHTML += `${heroDetails.series.available}`;
    let seriesNum = 1;
    for(i of heroDetails.series.items){
        series.innerHTML += `<h2>Series Number ${seriesNum}: ${i.name}</h2>`;
        seriesNum++;
    }
    comicNumber.innerHTML += `${heroDetails.comics.available}`;
    let comicsNum = 1;
    for(i of heroDetails.comics.items){
        comics.innerHTML += `<h2>Comic Number ${comicsNum}: ${i.name}</h2>`;
        comicsNum++;
    }

}

function heroLoad(){
    
    fetchHeroDetails(heroId);
    
}
heroLoad();
