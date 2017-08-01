
var findLocation = new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve,cantFind);
    }
    function cantFind(error) { 
        if (error.code == error.PERMISSION_DENIED) {
            reject("you denied me :-(");
        } 
        else {
            reject('err code: '+error.code);
        }
    } 
});

findLocation.then(getMeteo).catch(function(err) { console.log(err) });

function getMeteo(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    fetch('https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+lng)  
        .then(function(response) { return response.json(); })
        .then(function(response) { console.log(response) })
        .catch(function(err) { console.log(err) });
}

