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

class App {
  constructor() {
    this._getPosition();

    // When Form Submitted the map and data manipulation functionality
    form.addEventListener('submit',this._newWorkout);



    // To toggle the Elevation gain and the Cadence
    inputType.addEventListener('change',this._toggleElevationField);
  }
  

  _getPosition() {
    // Getting the coods of your current location...
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap,
        function () {
          alert('Please allow your current location 😢');
        }
      );
  }


  _loadMap(position) {
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
      map.on('click', function(MapE){
        MapEvent = MapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
  }



  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  
  }

  _newWorkout(e) {
      e.preventDefault();
    
      // Getting the data from the form
      const type = inputType.value;
      const distance = +inputDistance.value;
      const duration = +inputDuration.value;
      
      // If activity running create running object
      if(type === 'running'){
        const cadence = +inputCadence.value;
        // Checking the input validation
        if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)) return alert("Please Provide a Positive Number For Calculation :) ");
      }    



      // If activity cycling create cycling object
      if(type === 'cycling'){
        const elevation = +inputElevation.value;
        // Checking the input validation
        if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(elevation)) return alert("Please Provide a Positive Number For Calculation :) ")
      }




      // Add new object to workout array




      // Render workout on the map as marker
      console.log(MapEvent.latlng.lat,MapEvent.latlng.lng);
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



      // Render workout as a list
    





      // Hide the form And Clearing the form when submitted
      inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
    }

  }

const app = new App();





  class Workouts{
      date = new Date();
      id = (Date.now() + '').slice(-10);
      
      constructor(coords,distance,duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
      }
    }


    class Running extends Workouts{
        constructor(coords,distance,duration,cadence){
            super(coords,distance,duration);
            this.cadence = cadence;
            this.calcPace();
        }

        calcPace(){
          this.pace =  this.duration / this.distance;
          return this.pace;
        }
    }

    class Cycling extends Workouts{
        constructor(coords,distance,duration,elevation){
          super(coords,distance,duration);
          this.elevation = elevation;
          this.calcSpeed();
        }

        calcSpeed(){
          this.speed = this.distance / (this.duration / 60);
          return this.speed;
        }
  }
