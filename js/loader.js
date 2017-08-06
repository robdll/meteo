

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
                loaderMsg.classList.add('hide');
                setTimeout(function(){
                    loaderMsg.outerHTML = '';
                    delete loaderMsg;
                    createWeatherScreen();
                },2000)
            }
        }
    }

    function createWeatherScreen(){
        var weather = window.weather;
        var main, article, paragraph, details;
        mainTag = document.getElementsByTagName("MAIN")[0];
        article = create('ARTICLE');
        article.classList.add("weather-screen");
        article.appendChild(create('p', weather.city + ' - ' + weather.country ));
        article.appendChild(create('p', weather.description));
        article.appendChild(create('p', getIcon() + weather.temp + getSwitch() ));
        details = create('details');
        details.classList.add('noselect');
        details.appendChild(create('p', 'humidity: '+weather.humidity ));
        details.appendChild(create('p', 'pressure: '+weather.pressure ));
        details.appendChild(create('p', 'min: '+weather.temp_min ));
        details.appendChild(create('p', 'max: '+weather.temp_max ));
        article.appendChild(details);
        mainTag.appendChild(article);
        article.classList.add('show')
        //internal function
        function create(tag, html){ 
            var tag = document.createElement(tag); 
            tag.classList.add("noselect");
            if(html) { tag.innerHTML = html };
            return tag;
        }
        function getIcon() {
            var hotLvl = weather.temp % 6 > 4 ? 4 : weather.temp % 6;
            hotLvl += 0.5;
            hotLvl = Math.floor(hotLvl);
            return '<i class="fa fa-thermometer-'+ hotLvl + '"></i> ';
        }
        function getSwitch() {
           return ' &#8451;' +'<a class="switch">/&#8457;</a>'
        }
    }
}
