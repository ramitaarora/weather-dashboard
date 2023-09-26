var searchBar = document.querySelector("#search-city")
var searchSubmit = document.querySelector("#search-submit");

// Search Bar

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    var searchCity = event.target.searchTerm.value;

    if (searchCity) {
        getWeather(searchCity)
    }
})

function getWeather(city) {
    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=f2e334424bc1375278888844b225e7a5'
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data.city.name);
        console.log(data.list[0].weather);
    })
}

function saveSearch(city) {
    return;
}