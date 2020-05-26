let searchBtn = document.querySelector('#searchWeather')

//need to get the city name from the search bar
let cityName = document.getElementById('cityName');

searchBtn.addEventListener("click", function(){

    event.preventDefault();

    let city = cityName.value;
    console.log(city);

    const APIKey = "d367dcfadab5440b10dca09382825e01";
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(queryURL);
        console.log(response);

        $(".city").html('<h1>' + response.name + ' Weather Details</h1>');
        $(".wind").text('Wind speed: ' + response.wind.speed);
        $(".humidity").text('Humidity: ' + response.main.humidity);
    })

});



    //start of the forloop to create the 5-day forecast
    // for(i = 5; i <= 5; i++){

    // }