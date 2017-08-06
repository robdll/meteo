

function waitForLocation() {
    var loaderMsg = document.getElementById("disclaimer");
    var numberOfDot = 0;
    var fakeWriter = setInterval(intertain ,500)
    function intertain(){
        if(window.hasLocation || window.locationError) {
            clearInterval(fakeWriter);
            if(window.hasLocation){
                loaderMsg.classList.add('hide');
                setTimeout(function(){
                    loaderMsg.outerHTML = '';
                    delete loaderMsg;
                    createWeatherScreen();
                },1500)
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
        article.appendChild(create('p', weather.city + ' - ' + weather.country ));
        article.appendChild(create('p', weather.description));
        article.appendChild(create('p', getThermIcon() + weather.temp + getSwitch() ));
        article.appendChild(getDetailsDiv());
        mainTag.appendChild(article);
        article.classList.add(weather.type);
        article.classList.add('show');
        //internal function
        function create(tag, html){ 
            var tag = document.createElement(tag); 
            tag.classList.add("noselect");
            if(html) { tag.innerHTML = html };
            return tag;
        }
        function getThermIcon() {
            var hotLvl = weather.temp % 6 > 4 ? 4 : weather.temp % 6;
            hotLvl += 0.5;
            hotLvl = Math.floor(hotLvl);
            return '<i class="fa fa-thermometer-'+ hotLvl + '"></i> ';
        }
        function getArrowIcon() {
            return '<i id="detail" class="fa fa-caret-right"></i> ';
        }
        function getSwitch() {
           return ' &#8451;' +'<a class="switch">/&#8457;</a>'
        }
        function getDetailsDiv() {
            var x=0; 
            var isAnimating = false;
            var detais;
            details = create('div', getArrowIcon() + ' Details' );
            details.classList.add('noselect');
            details.classList.add('details');
            details.appendChild(create('p', 'humidity: '+weather.humidity ));
            details.appendChild(create('p', 'pressure: '+weather.pressure ));
            details.appendChild(create('p', 'min: '+weather.temp_min ));
            details.appendChild(create('p', 'max: '+weather.temp_max ));
            details.addEventListener("click", function() {
                if(!isAnimating){
                    isAnimating = true;
                    var iconClasses = details.firstChild.classList;
                    var classToAdd = 'rotate-counter'
                    if(x%2===0) {
                        classToAdd = 'rotate-clockwise'
                    } 
                    details.firstChild.classList.add(classToAdd);
                    x++;
                    setTimeout(function(){
                        if(x%2===0){
                            details.firstChild.classList.remove('rotate-counter');
                            details.firstChild.classList.remove('rotate-clockwise');
                        }
                        isAnimating = false;
                    },800)
                }
            });
            return details;
        }
    }
}
