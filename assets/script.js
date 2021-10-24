var apiKey = "a48b25c1208901ef94b2655363273fbd"
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



$('#searchBar').on('click', 'button', function() {
    console.log('clicked');
    weatherData();
    $('#textInput').val('')

});


