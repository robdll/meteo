
function waitForLocation() {
    var loaderMsg = document.getElementById("disclaimer");
    var numberOfDot = 0;
    var fakeWriter = setInterval(intertain ,1000)
    function intertain(){
        if(window.hasLocation || window.locationError) {
            clearInterval(fakeWriter);
            if(window.hasLocation){
                loaderMsg.classList.add('hide');
                setTimeout(function(){
                    loaderMsg.outerHTML = '';
                    delete loaderMsg;
                    createWeatherScreen();
                },1000)
            }
        } else if(numberOfDot < 3){
            loaderMsg.innerHTML += '.';
            numberOfDot++;
        } else {
            loaderMsg.innerHTML = 'DETECTING YOUR LOCATION';
            numberOfDot = 0;
        }

    }

    function createWeatherScreen(){
        var weather = window.weather;
        var main, article;
        mainTag = document.getElementsByTagName("MAIN")[0];
        article = create('ARTICLE');
        article.classList.add("weather-screen");
        article.appendChild(create('p', getTimeAndCity(), 'third-metric' ));
        article.appendChild(create('p', weather.description, 'main-metric' ));
        article.appendChild(create('p', weather.temp + getSwitch('C','F'), 'second-metric'  ));
        article.appendChild(getDetailsDiv());
        mainTag.appendChild(article);
        article.classList.add('show');
        document.body.classList.add(weather.type.toLowerCase());
        //internal function
        function getTimeAndCity() {
            var time = new Date().getHours() + ":" + ('0'+new Date().getMinutes()).slice(-2);
            var city = weather.city.toUpperCase() + ' ' + weather.country;
            return time + ' - ' + city;
        }

        function getArrowIcon() {
            return '<i id="detail" class="fa fa-caret-right"></i> ';
        }
        function getDetailsDiv() {
            var x=0; 
            var isAnimating = false;
            var detais;
            details = create('div');
            details.classList.add('noselect');
            details.classList.add('details');
            details.appendChild(create('p', 'Humidity: '+weather.humidity ));
            details.appendChild(create('p', 'Pressure: '+weather.pressure ));
            details.appendChild(create('p', 'Min: '+weather.temp_min +' &#176;C' ));
            details.appendChild(create('p', 'Max: '+weather.temp_max +' &#176;C' ));
            return details;
        }
    }
}

function switchMetric(el, farenightRequired){
    var metric1 = farenightRequired ? 'F' : 'C';
    var metric2 = farenightRequired ? 'C' : 'F';
    var temp = farenightRequired ? weather.temp * 9 / 5 + 32 : weather.temp;
    el.parentElement.innerHTML = temp + getSwitch(metric1,metric2);
    var detail = document.getElementsByClassName("details")[0];
    detail.removeChild(detail.lastChild);
    detail.removeChild(detail.lastChild);
    detail.appendChild(create('p', 'Min: '+ (farenightRequired ? weather.temp_min * 9 / 5 + 32  : weather.temp_min) + ' &#176;'+(farenightRequired ? 'F' : 'C') ));
    detail.appendChild(create('p', 'Max: ' + (farenightRequired ? weather.temp_max * 9 / 5 + 32  : weather.temp_max) + ' &#176;'+(farenightRequired ? 'F' : 'C') ));
}

function getSwitch(metric1, metric2) {
    var farenightRequired = metric1 === 'C';
    return ' &#176;' + metric1 +'<a class="switch" onclick="switchMetric(this,'+farenightRequired+')">/&#176;'+ metric2 +'</a>'
}

function create(tag, html, css) { 
    var tag = document.createElement(tag); 
    tag.classList.add("noselect");
    if(html) { tag.innerHTML = html };
    if(css) { tag.classList.add(css); }
    return tag;
}