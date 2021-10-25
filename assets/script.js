var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];


var weatherData = function() {
    var cityInput = $('#textInput').val().trim();
    // console.log(cityInput);
    // API Section
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=a48b25c1208901ef94b2655363273fbd&units=imperial";

    fetch(apiUrl)
        .then(function(response){
            if(response.ok) {
                response.json().then(function(data){
                    // console.log("weatherData", data)
                    cityDate(data);
                    currentWeather(data);
                    searchHistoryBtn(data);
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
    var cooridnates = {
        Latt: data.city.coord.lat,
        Long: data.city.coord.lon
    }
    $("#temp").text("Temp: "+temperature+"°F")
    $("#wind").text("Wind: "+wind+"mph")
    $("#humidity").text("Humidity: "+humidity+"%")

    var uvi = function(cooridnates) {
        var uviUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+cooridnates.Latt+"&lon="+cooridnates.Long+"&appid=a48b25c1208901ef94b2655363273fbd";
        
        fetch(uviUrl)
        .then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    console.log(data)
                    $('#warning').text(data.current.uvi);
                    if (data.current.uvi >= 5){
                        $("#warning").addClass('bg-danger')
                    } else if (data.current.uvi <  5 && data.current.uvi >= 3){
                        $("#warning").addClass('bg-warning')
                    } else {
                        $("#warning").addClass('bg-success')
                    }
                })
            }
        });
    }
    uvi(cooridnates);
};

var searchHistoryBtn = function(data) {
    var historyBtn = $("<button>")
    .addClass('btn bg-secondary m-1 text-light')
    .text(data.city.name)
    $('#history').append(historyBtn);

    saveHistory();
}

var saveHistory = function() {
    var citiesArr = []
    var historyObjArr = $('#history').children()
    for (let i = 0; i < historyObjArr.length; i++) {
        const newCity = historyObjArr[i].textContent;
        citiesArr.push(newCity)
    }
    localStorage.setItem('cities', JSON.stringify(citiesArr))
}

$("#history").on('click', 'button', function(){
    var searchedBtn = $(this).text().trim()
    reloadBtn(searchedBtn);
})

var reloadBtn = function(searchedBtn){
    searchedBtn.replace('', '%20');
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedBtn + "&appid=a48b25c1208901ef94b2655363273fbd&units=imperial";

    fetch(apiUrl)
        .then(function(response){
            if(response.ok) {
                response.json().then(function(data){
                    // console.log("weatherData", data)
                    cityDate(data);
                    currentWeather(data);
                })
            } else {
                alert('Please enter a valid city')
            };
        })
        .catch(function (error) {
            alert('Unable to reach GitHub')
        });}

var reloadHistory = function(){
    for (let i = 0; i < searchHistory.length; i++) {
        var historyBtn = $("<button>")
        .addClass('btn bg-secondary m-1 text-light')
        .text(searchHistory[i])
        $('#history').append(historyBtn);
    }
}
reloadHistory();

$('#searchBar').on('click', 'button', function() {
    // console.log('clicked');
    weatherData();
    $('#textInput').val('')
});


