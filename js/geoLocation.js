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
  //  fetch('https://fcc-weather-api.glitch.me/api/current?lat=45.46&lon=9.19')  
        .then(function(response) { return response.json(); })
        .then(function(response) { console.log(response); return response; })
        .then(addArticle)
        .catch(function(err) { console.log(err) });

    function addArticle(data) {
        var main, article, paragraph, details;
        var weather = {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            type: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        }
        mainTag = document.getElementsByTagName("MAIN")[0];
        article = create('ARTICLE');
        article.classList.add("weather-screen");
        article.appendChild(create('p', weather.city + ' - ' + weather.country ));
        article.appendChild(create('p', weather.description));
        article.appendChild(create('p', getIcon() + weather.temp + getSwitch() ));
        window.hasLocation = true;
        details = create('details');
        details.appendChild(create('p', 'humidity: '+weather.humidity ));
        details.appendChild(create('p', 'pressure: '+weather.pressure ));
        details.appendChild(create('p', 'min: '+weather.temp_min ));
        details.appendChild(create('p', 'max: '+weather.temp_max ));
        article.appendChild(details);
        mainTag.appendChild(article);
        //internal function
        function create(tag, html){ 
            var tag = document.createElement(tag); 
            if(html) { tag.innerHTML = html };
            return tag;
        }
        function getIcon(){
            var hotLvl = weather.temp % 6 > 4 ? 4 : weather.temp % 6;
            hotLvl += 0.5;
            hotLvl = Math.floor(hotLvl);
            return '<i class="fa fa-thermometer-'+ hotLvl + '"></i> ';
        }
        function getSwitch() {
           return ' C' +'<a clas="switch">/F</a>'
        }
    }
}

function cantFind(error) { 
    window.locationError = true;
    var loaderMsg = document.getElementById("disclaimer");
    loaderMsg.innerHTML =   error.code === error.PERMISSION_DENIED ? 'ARE YOU SERIOUS?' :
                            error.code === error.POSITION_UNAVAILABLE ? 'MMH, HAVING PROBLEM WITH YOUR LOCATION, TRY AGAIN' : // USE THE INPUT BOX PLEASE' :
                            error.code === error.TIMEOUT ? 'I\'VE BEEN WAITING FOR DAYS BRO...' : 
                            error.code === error.UNKNOWN_ERROR ? 'I FUCKED UP' : 'DON\'T KNOW WHAT HAPPENED';
    var errText = 'err code: '+error.code;
    console.log(errText);
} 

