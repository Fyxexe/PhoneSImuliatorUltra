function displayTime() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var month = dateTime.toLocaleString('en-US', { month: 'long' });
    var day = dateTime.getDate();
    var year = dateTime.getFullYear();

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minut').innerHTML = min;
    document.getElementById('monthly').innerHTML = month;
    document.getElementById('day').innerHTML = day;
    document.getElementById('year').innerHTML = year;
}

setInterval(displayTime, 1000); 




function fetchWeatherData(latitude, longitude) {
    var apiKey = '886705b4c1182eb1c69f28eb8c520e20';
    var lang = 'ru';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temperature = (data.main.temp - 273.15).toFixed(2); 
            var weatherDescription = data.weather[0].description;
            var location = data.name + ', ' + data.sys.country; 
            var weatherIconCode = data.weather[0].icon; 

            
            document.getElementById('temperature').innerHTML = temperature + '°C';
            document.getElementById('weather-description').innerHTML = weatherDescription;
            document.getElementById('location').innerHTML = location;

           
            var weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
            document.getElementById('weather-icon').src = weatherIconUrl;
        })
        .catch(function (error) {
            console.log('Error fetching weather data: ', error);
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            fetchWeatherData(latitude, longitude);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

getLocation();
setInterval(getLocation, 60000); 

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const searchInput = this.querySelector('input[type="search"]');
        const query = encodeURIComponent(searchInput.value);
        const googleSearchUrl = `https://www.google.com/search?q=${query}`;

       
        window.open(googleSearchUrl, '_blank');
    });
});

