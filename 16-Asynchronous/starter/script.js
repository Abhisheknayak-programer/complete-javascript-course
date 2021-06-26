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
/*
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


*/


///////////////////////////         Try Catch Blocks Using Async Await          ////////////////////////
/* 
const getPosition = function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject)
    });
}

const whereAmI = async function(){
    try {
        // Getting Position
        const position = await getPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoResponse = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`); 
        const geoData = await geoResponse.json();

        
        // Rendering the country Which is fetched Above
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${geoData.country}`);
        const data = await response.json();
        renderCountry(data[1]);

    } catch (error) {
        console.error(`Our Error is ${error}`);
    }
}



btn.addEventListener('click',function(){
    whereAmI();
    btn.style.display = 'none';
})

*/





////////////////////// Returning Values From Async Await Functions Using Promises  /////////////////////
/*
const getPosition = function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject)
    });
}

const whereAmI = async function(){
    try {
        // Getting Position
        const position = await getPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoResponse = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`); 
        const geoData = await geoResponse.json();

        
        // Rendering the country Which is fetched Above
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${geoData.country}`);
        const data = await response.json();
        renderCountry(data[1]);

        return `you are in ${geoData.city} of ${geoData.country}`;
    } catch (error) {
        console.error(`Our Error is ${error}`);
    }
}


whereAmI()
.then(res => console.log(res))
.catch(err => console.log(err))
.finally(()=>console.log(`Tracked Geolocation`));
*/





////////////////////// Returning Values From Async Await Functions Using Async Await And IIFE(Immediately Invocked Fnunction Expression)  /////////////////////
/*
const getPosition = function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject)
    });
}

const whereAmI = async function(){
    try {
        // Getting Position
        const position = await getPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoResponse = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`); 
        const geoData = await geoResponse.json();

        
        // Rendering the country Which is fetched Above
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${geoData.country}`);
        const data = await response.json();
        renderCountry(data[1]);

        return `you are in ${geoData.city} of ${geoData.country}`;
    } catch (error) {
        console.error(`Our Error is ${error}`);
    }
}

// IIFE IMPLEMENTATION
(async function(){  
    try {
        const city = whereAmI();
        console.log(city);
        
    } catch (error) {
        console.error(`My ERROR IS ${error} 💣`);
    }
})();
*/








////////////////////////////      Running Promises In Parallel      ///////////////////////////
//GETJSON  IS USED TO GET THE JSON FORMAT FROM THE API 
/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };

  
const getThreeCountryDetails = async function(c1,c2,c3){
    try {

    //// METHOD--1
    // const [data1] = await getJSON(
    // `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //     `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //     `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital,data2.capital,data3.capital])


    //// METHOD--2
    const data = await Promise.all([
        getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
    ])

    const Capitals = data.map(Eachdata => Eachdata[0].capital);
    console.log(Capitals);

} catch (error) {
    console.log(`Our ERROR : ${error}`);
}
}

getThreeCountryDetails('tanzania','portugal','usa');

*/








/////////////////////////////// Implementing Promise.race() ////////////////////////////////////////////
/*
const getJSON = function(url){
    return fetch(url).then(response =>{
        if(!response.ok) throw new Error(`Something Went Wrong ${response.status}`)
        return response.json();
    })
}

const getAnyOneCountryData = async function(c1,c2,c3){
    const data = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
    ]);
    // console.log(data[0])
}
getAnyOneCountryData('Italy','egypt','Mexico');


////////////////////////////// Making it More real-world Using Promise.race([]) /////////////////////////
const timeout = function(seconds){
  return new Promise(function(_,reject){
    setTimeout(function(){
        reject(new Error(`Request Took Much Time`));
    },seconds * 1000)    
  })  
} 

Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/india`),
    timeout(0.05)
]).then(res => console.log(res[1].name)).catch(err => console.log(err))

*/








///////////////////////////////         Promise.allSettled()    ///////////////////////////////////
/*
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Success')
]).then(res => console.log(res)).catch(err => console.log(err));


Promise.all([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Success')
]).then(res => console.log(res)).catch(err => console.log(err));






/////////////////////////////////////////////      Promise.any()[ ES2021]      /////////////////////////////
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Success')
]).then(res => console.log(res)).catch(err => console.log(err));

*/