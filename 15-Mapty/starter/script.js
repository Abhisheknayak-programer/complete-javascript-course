'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, MapEvent;

// Getting the coods of your current location...
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(latitude,longitude)
      console.log(`https://www.google.com/maps/@${latitude}${longitude}`);

      const coords = [latitude, longitude];

      // Displaying the map in th screen here 'map' which is written down is the id of the
      // div which will contain  the map  on the screen
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Map Clicking Event
      map.on('click', function (MapE) {
        MapEvent = MapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });

    },
    function () {
      alert('Please allow your current location 😢');
    }
  );



// When Form Submitted the map and data manipulation functionality
form.addEventListener('submit', e => {
  e.preventDefault();
  // console.log(MapEvent.latlng.lat,MapEvent.latlng.lng);
  const ClickedCoords = [MapEvent.latlng.lat, MapEvent.latlng.lng];

  L.marker(ClickedCoords)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `running-popup`,
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});



// To toggle the Elevation gain and the Cadence
inputType.addEventListener("change",()=>{
  inputElevation.closest('.form__row').classList.toggle("form__row--hidden");
  inputCadence.closest('.form__row').classList.toggle("form__row--hidden");
})