

function waitForLocation() {
    var loaderMsg = document.getElementById("disclaimer");
    var numberOfDot = 0;
    var fakeWriter = setInterval(intertain ,500)
    function intertain(){
        if(numberOfDot < 3){
            loaderMsg.innerHTML += '.';
            numberOfDot++;
        } else {
            loaderMsg.innerHTML = 'DETECTING YOUR LOCATION';
            numberOfDot = 0;
        }
        if(window.hasLocation || window.locationError) {
            clearInterval(fakeWriter);
            if(window.hasLocation){
                loaderMsg.outerHTML = '';
                delete loaderMsg;
            }
        }
    }

}
