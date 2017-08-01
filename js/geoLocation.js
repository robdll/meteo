getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // display 404 like in this case
    }
}
function showPosition(position) {
    var pos = "Latitude: " + position.coords.latitude +  "<br>Longitude: " + position.coords.longitude; 
    console.log(pos)
}