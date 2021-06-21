'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');



    class Workouts{
      date = new Date();
      id = (Date.now() + '').slice(-10);
      
      constructor(coords,distance,duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
      }

      _setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
      }
    }


    class Running extends Workouts{
        constructor(coords,distance,duration,cadence){
            super(coords,distance,duration);
            this.type = 'running';
            this.cadence = cadence;
            this.calcPace();
            this._setDescription();
        }

        calcPace(){
          this.pace =  this.duration / this.distance;
          return this.pace;
        }
    }

    class Cycling extends Workouts{
        constructor(coords,distance,duration,elevation){
          super(coords,distance,duration);
          this.type = 'cycling';
          this.elevation = elevation;
          this.calcSpeed();
          this._setDescription();
        }

        calcSpeed(){
          this.speed = this.distance / (this.duration / 60);
          return this.speed;
        }
    }




let map, MapEvent;
let workouts = [];



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
      const ClickedCoords = [MapEvent.latlng.lat, MapEvent.latlng.lng];
      let workout;


      // If activity running create running object
      if(type === 'running'){
        const cadence = +inputCadence.value;
        // Checking the input validation
        if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence) || distance < 0 || cadence < 0 || duration < 0 ) return alert("Please Provide a Positive Number For Calculation :) ");

        workout = new Running(ClickedCoords,distance,duration,cadence);
      }    



      // If activity cycling create cycling object
      if(type === 'cycling'){
        const elevation = +inputElevation.value;
        // Checking the input validation
        if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(elevation) || distance < 0 || duration < 0 ) return alert("Please Provide a Positive Number For Calculation :) ");
        
        workout = new Cycling(ClickedCoords,distance,duration,elevation);
      }




      // Add new object to workout array
      workouts.push(workout);
      

      // Render workout on the map as marker
      console.log(MapEvent.latlng.lat,MapEvent.latlng.lng);
    
      L.marker(ClickedCoords)
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
          })
        )
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴'} ${workout.description}`)
        .openPopup();



      // Render workout as a list
          let html = `
          <li class="workout workout--${workout.type}" data-id=${workout.id}>
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
      `;

      if(workout.type === 'running'){
        html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
      }

      if(workout.type === 'cycling'){
        html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li> 
        `;
      }

      form.insertAdjacentHTML('afterend',html);






      // Hide the form And Clearing the form when submitted
      inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
      form.classList.add('hidden');

    }
  

  }

const app = new App();


