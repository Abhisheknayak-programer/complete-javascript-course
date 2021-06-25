'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////     RENDERING COUNTRIES     /////////////////////////////////////////////////
const renderCountry = function (data,classname="") {
    const html = `
        <article class="country ${classname}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
        data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const ErrorTextGenerator = (Msg) =>{
    countriesContainer.insertAdjacentText('afterbegin',Msg);
}


////////////////////////////   API CALLING USING XML HTTP REQUEST (OLD WAY)    ////////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[0];
    console.log(data);

    renderCountry(data);
  });
};

*/



////////////////////////////   API CALLING USING FETCH API AND PROMISES (MODERN WAY)    //////////////////////////

/*
const getCountryData = function(country){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((response)=>{
            // console.log(response);
            return response.json()})
        .then((data)=>{
            // console.log(data[0]);
            renderCountry(data[0]);
        })
}

getCountryData('sri lanka');
getCountryData('usa');
getCountryData('saint');
getCountryData('nepal');

*/


////////////////   API CALLING USING FETCH API AND PROMISES CHANNING USING PROMISES ///////////////
/*
const getCountryData = function(country){
    // Country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then((data)=>{
        // console.log(data[0]);
        renderCountry(data[0])

        const neighbouringCountry = data[0].borders[0];
        if(!neighbouringCountry) return;
        // console.log(neighbouringCountry);
        // Country 2
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbouringCountry}`);
    }).then(response => response.json())
    .then((data)=>{
        // console.log(data);
        renderCountry(data,'neighbour');
        const neighbouringCountry2 = data.borders[2];
        if(!neighbouringCountry2) return;
        console.log(neighbouringCountry2);
        // Country 2
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbouringCountry2}`);
    }).then(response => response.json())
    .then(data =>{
        renderCountry(data,"neighbour");
    })
}

getCountryData("sri lanka");

*/




////////////////  BEST USE CASE OF ==>>>  FETCH API | THEN() | CATCH() | FINALLY() ///////////////
/*
const getCountryData = function(country){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(Response => Response.json())
    .then(data =>{
        renderCountry(data[0]);

        const Neighbour = data[0].borders[7];
        if(!Neighbour) return;

        return fetch(`https://restcountries.eu/rest/v2/alpha/${Neighbour}`)
    }).then(response => response.json())
    .then((data)=>{
        renderCountry(data,"neighbour");
    }).catch((err)=>{
        console.error(`💥💥💥💥       ${err}      💥💥💥💥`),
        ErrorTextGenerator(`Hey something went wrong try again after sometime...`)  
    })
    .finally(()=>{
        countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener("click",function(){
    getCountryData("Bharat");
    btn.style.display = 'none';
})


*/





////////////////////////////////////////////////    USING ASYNC AWAIT   //////////////////////////////////////////
// Getting the current position using the geolocation API
const getPosition = function(){
   return new Promise(function(resolve,reject){
    navigator.geolocation.getCurrentPosition(resolve,reject);
   })
}


const whereAmI = async function(){
    const position = await getPosition();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const request = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const GeoData = await request.json();
    // console.log(GeoData.country)

    // Country data
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${GeoData.country}`);
    const data = await res.json();
    renderCountry(data[0]);
}


btn.addEventListener('click',function(){
    whereAmI();
    btn.style.display = 'none';
})
