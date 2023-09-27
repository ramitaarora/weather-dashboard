var searchBar = document.querySelector("#search-city")
var searchSubmit = document.querySelector("#search-submit");

var currentWeatherDiv = document.querySelector('#current-weather');
var fiveDayDiv = document.querySelector('#five-day')

// Search Bar

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    var searchCity = event.target.searchTerm.value;
    currentWeatherDiv.innerHTML = '';
    fiveDayDiv.innerHTML = '';

    if (searchCity) {
        getWeather(searchCity)
    }
})

function getWeather(city) {
    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=f2e334424bc1375278888844b225e7a5'
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        var cityName = data.city.name;
        var temp = data.list[0].main.temp;
        var description = data.list[0].weather[0].main;
        var icon = data.list[0].weather[0].icon;
        var date = (data.list[0].dt_txt).slice(0, -9)
        var humidity = data.list[0].main.humidity;
        var windSpeed = data.list[0].wind.speed;

        displayCurrentWeather(cityName, temp, description, icon, date, humidity, windSpeed);
        
        for (let i=1; i < data.list.length; i++) {
            var currDate = (data.list[i].dt_txt).slice(0,-9);
            var lastDate = (data.list[i-1].dt_txt).slice(0,-9);

            if (currDate > lastDate) {
                displayFiveDay((
                    (data.list[i].dt_txt).slice(0, -9)), 
                    data.list[i].main.temp, 
                    data.list[i].weather[0].main, 
                    data.list[i].weather[0].icon, 
                    data.list[i].main.humidity,
                    data.list[i].wind.speed
                )
            }
        }

        
    })
}

function saveSearch(city) {
    return;
}


function displayCurrentWeather(cityName, temp, description, icon, date, humidity, windSpeed) {
    currentWeatherDiv.innerHTML = `
    <h2>${cityName} (${date})</h2>
    <img src='http://openweathermap.org/img/wn/${icon}.png' alt=${description}/>
    <p>Current temperate: ${(Math.trunc((temp - 273.15) * (9/5) + 32))}°F</p>
    <p>${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind speed: ${windSpeed} MPH</p>
    `
}

function displayFiveDay(date, temp, description, icon, humidity, windSpeed) {
    fiveDayDiv.innerHTML += `
    <div id="weather-card">
        <h3>${date}</h3>
        <img src='http://openweathermap.org/img/wn/${icon}.png' alt=${description}/>
        <p>Temperature: ${(Math.trunc((temp - 273.15) * (9/5) + 32))}°F</p>
        <p>${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind speed: ${windSpeed} MPH</p>
    </div>
    `
}