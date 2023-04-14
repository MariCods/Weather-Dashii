var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?`;
var APIKEY = '8b898c3025d1ef3a71e8de4af256aea3';
let  city = inputBar.value;
var geocoderURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},CA,USA&appid=${APIKEY}`;


// var lon;
// var lat;
var searchLocation;
var eventResult;

var weathCards = $('.weather-posts');
var weathEL = $('.weath-place');
var currentDeg = $('.current-temp');
var highTemp = $('.high');
var lowTemp = $('.low');
var weatherDes = $('.description');
var weathDate = $('.date');
var weathButton = $('.button');
var inputBar = $("#user-input");

// function parsedLocation(result) {
//   lon = result.center[0];
//   lat = result.center[1];
//   weathEL.text("Weather in" + result.place_name);
//   // getWeather(lon, lat);
// }



function getWeather() {
  // fetch(geocoderURL + '&limit=5 + &units=imperial&appid=')
  // .then(function(response){
  //   return response.json();
  // })
  // .then(function(data){
  //   console.log(data)
  // })

  fetch(geocoderURL + city)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fetch(weatherURL + '&lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial&appid=" + APIKEY)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          for (var i = 0; i < weathCards.length; i++) {
           
           
            currentDeg[i].textContent = data.list[i].main.temp;
           
            highTemp[i].textContent = data.list[i].main.temp_max;
            
            lowTemp[i].textContent = data.list[i].main.temp_min;
            
            weatherDes[i].textContent = data.list[i].weather[0].description;
            //  weathDate[i].textContent = dayjs.unix(data.list.dt_txt[i]).format('M/D/YY');
            console.log(i);
            
          }
         
        }
        )
      console.log(data);
    })



};

// var formSubmitHandler = function (event) {
//   event.preventDefault();

//   if (eventResult) {
//     parseLocation(eventResult);
//   }


// };

function loadWeather() {
  inputBar = localStorage.getItem('#user-input');
  lon = localStorage.getItem('lon');
  lat = localStorage.getItem('lat');

  weathEL.text("Weather for " + inputBar);
  getWeather(lon, lat);

  weathButton.on("click", function () {
    inputBar = input.value;
    console.log(searchLocation);
  })

};



loadWeather();

