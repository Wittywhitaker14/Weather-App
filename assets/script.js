var searchHistory = JSON.parse(localStorage.getItem("history")) || [];

var weatherData = function() {
    var cityInput = $('#textInput').val().trim();
    // console.log(cityInput);
    // API Section
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=a48b25c1208901ef94b2655363273fbd&units=imperial";

    fetch(apiUrl)
        .then(function(response){
            if(response.ok) {
                response.json().then(function(data){
                    console.log("weatherData", data)
                    cityDate(data);
                    currentWeather(data);
                })
            } else {
                alert('Please enter a valid city')
            };
        })
        .catch(function (error) {
            alert('Unable to reach GitHub')
        });
};

var cityDate = function(data) {
    $('#displayCurrent').text(data.city.name + " (" + moment().format('MM/DD/YYYY') + ")")
}

var currentWeather = function(data) {
    var temperature = data.list[0].main.temp
    var wind = data.list[0].wind.speed
    var humidity = data.list[0].main.humidity

    $("#temp").text("Temp: "+temperature+"°F")
    $("#wind").text("Wind: "+wind+"mph")
    $("#humidity").text("Humidity: "+humidity+"%")
}

$('#searchBar').on('click', 'button', function() {
    console.log('clicked');
    weatherData();
    $('#textInput').val('')

});


