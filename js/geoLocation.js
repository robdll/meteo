function findLocation() {
    return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve,reject);
        }
    });
}

/** TODO  store location in localstorage */
/** TODO  retrieve locations from local storage */
/** TODO  call getMeteo providing all locations */
findLocation()
    .then(getMeteo)
    .catch(cantFind);


/** TODO  get meteo for each location */
/** TODO  create termometer for each location */
function getMeteo(location) {
    var lat = location.coords.latitude;
    var lng = location.coords.longitude;
    fetch('https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+lng)  
        .then(function(response) { return response.json(); })
        .then(function(response) { console.log(response); return response; })
        .then(moifyTermometer)
        .catch(function(err) { console.log(err) });

    function moifyTermometer(data) {
        /** TODO  edit termometer data with weather data */
        var weather = {
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            type: data.weather.main,
            icon: data.weather.icon,
        }
        window.hasLocation = true;
    }
}

function cantFind(error) { 
    window.locationError = true;
    var loaderMsg = document.getElementById("disclaimer");
    loaderMsg.innerHTML =   error.code === error.PERMISSION_DENIED ? 'ARE YOU SERIOUS?' :
                            error.code === error.POSITION_UNAVAILABLE ? 'MMH, HAVING PROBLEM WITH YOUR LOCATION, USE THE INPUT BOX PLEASE' :
                            error.code === error.TIMEOUT ? 'I\'VE BEEN WAITING FOR DAYS BRO...' : 
                            error.code === error.UNKNOWN_ERROR ? 'I FUCKED UP' : 'DON\'T KNOW WHAT HAPPENED';
    var errText = 'err code: '+error.code;
    console.log(errText);
} 

