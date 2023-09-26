var searchBar = document.querySelector("#search-city")
var searchSubmit = document.querySelector("#search-submit");

var currentWeatherDiv = document.querySelector('#current-weather');

// Search Bar

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    var searchCity = event.target.searchTerm.value;
    currentWeatherDiv.innerHTML = '';

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
        var description = data.list[0].weather[0].description;
        var icon = data.list[0].weather[0].icon;
        var date = data.list[0].dt_txt;
        var humidity = data.list[0].main.humidity;
        var windSpeed = data.list[0].wind.speed;
        displayCurrentWeather(cityName, temp, description, icon, date, humidity, windSpeed);
    })
}

function saveSearch(city) {
    return;
}


function displayCurrentWeather(cityName, temp, description, icon, date, humidity, windSpeed) {
    currentWeatherDiv.innerHTML = `
    <h2>${cityName} (${date})</h2>
    <p>Current temperate: ${(Math.trunc((temp - 273.15) * (9/5) + 32))}°F</p>
    <p>${description}</p>
    <img src='http://openweathermap.org/img/wn/${icon}.png' alt=${cityName}/>
    <p>Humidity: ${humidity}%</p>
    <p>Wind speed: ${windSpeed}km/hr</p>
    `
}