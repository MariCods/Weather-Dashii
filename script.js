var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
var APIKEY
var lon;
var lat;
var searchLocation;
var eventResult;

var weathEL = $('#weath-place');
var currentDeg = $('#current-temp');
var highTemp = $('#high');
var lowTemp = $('#low');
var weatherDes = $('#description');
var weathDate = $('#date');
var weathButton = $('.button');

function parsedLocation(result) {
    lon = result.center[0];
    lat = result.center[1];
    weathEL.text("Weather in" + result.place_name);
    getWeather(lon, lat);
}

     function getWeather (lat, lon){
        fetch(weatherURL + 'lat=' + lat + '&lon=' + lon + "&units=imperial&" + APIKEY)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data); 
    
            for(var i=0; i<weatherCards.length; i++){
                currentDeg[i].textContent = data.daily[i].temp.max;
                highTemp[i].textContent = data.daily[i].temp.max;
                lowTemp[i].textContent = data.daily[i].temp.max;
                weatherDes[i].textContent = data.daily[i].weather[0].description;
                weathDate[i].textContent = dayjs.unix(data.daily[i].sunrise).format('M/D/YY');
            }
        }
    )};

    var formSubmitHandler = function (event) {
        event.preventDefault();
      
        if(eventResult){
          parseLocation(eventResult);
        }
      
      };
      
      // Initially loads weather from searched city on homepage
      function loadWeather() {
        searchLocation = localStorage.getItem('userLocation');
        lon = localStorage.getItem('userLon');
        lat = localStorage.getItem('userLat');
      
        weathEL.text("Weather for " + searchLocation);
        getWeather(lon, lat);
      }
        
