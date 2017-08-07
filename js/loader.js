
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
        article.appendChild(create('p', weather.city + ' - ' + weather.country, 'secondary-metric' ));
        article.appendChild(create('p', weather.description, 'main-metric' ));
        article.appendChild(create('p', getThermIcon() + weather.temp + getSwitch('C','F'), 'main-metric'  ));
        article.appendChild(getDetailsDiv());
        mainTag.appendChild(article);
        article.classList.add('show');
        document.body.classList.add(weather.type.toLowerCase());
        //internal function
        function create(tag, html, css) { 
            var tag = document.createElement(tag); 
            tag.classList.add("noselect");
            if(html) { tag.innerHTML = html };
            if(css) { tag.classList.add(css); }
            return tag;
        }

        function getArrowIcon() {
            return '<i id="detail" class="fa fa-caret-right"></i> ';
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
                    var paragraphs = details.querySelectorAll("p");
                    var classToAdd = 'rotate-counter'
                    if(x%2===0) {
                        classToAdd = 'rotate-clockwise';
                        details.firstChild.classList.add(classToAdd);
                        for(var i=0; i<paragraphs.length; paragraphs[i++].classList.add('show'));
                    } else {
                        details.firstChild.classList.add(classToAdd);
                        for(var i=0; i<paragraphs.length; paragraphs[i++].classList.add('hide'));
                    }
                    x++;
                    setTimeout(function(){
                        if(x%2===0){
                            details.firstChild.classList.remove('rotate-counter');
                            details.firstChild.classList.remove('rotate-clockwise');
                            for(var i=0; i<paragraphs.length; i++) {
                                paragraphs[i].classList.remove('show');
                                paragraphs[i].classList.remove('hide');
                            }
                            
                        }
                        isAnimating = false;
                    },800)
                }
            });
            return details;
        }
    }
}

function switchMetric(el, farenightRequired){
    var metric1 = farenightRequired ? 'F' : 'C';
    var metric2 = farenightRequired ? 'C' : 'F';
    var temp = farenightRequired ? weather.temp * 9 / 5 + 32 : weather.temp;
    el.parentElement.innerHTML = getThermIcon() + temp + getSwitch(metric1,metric2)
}

function getSwitch(metric1, metric2) {
    var farenightRequired = metric1 === 'C';
    return ' ' + metric1 +'<a class="switch" onclick="switchMetric(this,'+farenightRequired+')">/'+ metric2 +'</a>'
}

function getThermIcon() {
    var hotLvl = weather.temp / 6 > 4 ? 4 : weather.temp / 6;
    hotLvl += 0.5;
    hotLvl = Math.floor(hotLvl);
    return '<i class="fa fa-thermometer-'+ hotLvl + '"></i> ';
}