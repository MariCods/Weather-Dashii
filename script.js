var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?`;

var APIKEY = '8b898c3025d1ef3a71e8de4af256aea3';
var city = "";
var geocoderURL = "";
var currentUrl = "";


//  var lon;
//  var lat;
var searchLocation;
var eventResult;

var weathCards = $('.weather-posts');
var weathEL = $('.weath-place');
var currentDeg = $('.current-temp');
var currWeather = $('.current-weather');
var highTemp = $('.high');
var hTemp = $('.high-temp');
var lowTemp = $('.low');
var lTemp = $('.low-temp');
var weatherDes = $('.description');
var weathDes = $('#description');

var weathDate = $('.date');
var weathButton = $('.button');
var inputBar = $('#user-input');
var humW = $('.humid');
var humidityW = $('#humidity');
//  var degreeP =  $('#icon');

function getgeoCoderdata() {
  return fetch(geocoderURL)
    .then(function (response) {
      return response.json();
    })

}


function getWeather() {

  getgeoCoderdata()
    .then(function (data) {
      const currURL = currentUrl + '&lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial&appid=" + APIKEY;
      
      fetch(currURL)
        .then(function (response) {
          return response.json();
        }).then(function (currentweatherData) {
          console.log(currentweatherData);
          currWeather.text(currentweatherData.main.temp);

          hTemp.text(currentweatherData.main.temp_max);

          lTemp.text(currentweatherData.main.temp_min);
          humidityW.text(currentweatherData.main.humidity);

          weathDes.text(currentweatherData.weather[0].description);

        })
    })
  getgeoCoderdata()
    .then(function (data) {
      fetch(weatherURL + '&lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial&appid=" + APIKEY)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var j = 0;
          for (var i = 3; i < data.list.length; i = i + 8) {

            currentDeg[j].textContent = data.list[i].main.temp;

            highTemp[j].textContent = data.list[i].main.temp_max;

            lowTemp[j].textContent = data.list[i].main.temp_min;
            lowTemp[j].textContent = data.list[i].main.temp_min;
            console.log(humW,j);
            humW[j].textContent = data.list[i].main.humidity;

            weatherDes[j].textContent = data.list[i].weather[0].description;
            weathDate[j].textContent = moment.unix(data.list[i].dt).format('M/D/YY');
            console.log(j);
            j++;

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

  weathButton.on("click", function () {
    city = inputBar.val();
    var currentStorage = [];
    currentStorage.push(localStorage.getItem('input-bar'));
    currentStorage.push(city);
    document.getElementById('user-input').value = currentStorage[currentStorage.length-1]
    
    localStorage.setItem("input-bar", currentStorage, JSON.stringify());
    currentUrl = `https://api.openweathermap.org/data/2.5/weather?`
    geocoderURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=${APIKEY}`
    weathEL.text("Weather for " + city);
    getWeather();


  })

};



loadWeather();

