let searchBtn = document.querySelector('#searchWeather')

//need to get the city name from the search bar
let cityName = document.getElementById('cityName');

searchBtn.addEventListener("click", function(){

    event.preventDefault();

    //setting city name from value entered in search box
    let city = cityName.value;

    //setting apikey variable
    const APIKey = "d367dcfadab5440b10dca09382825e01";
    //setting query URL value
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    //ajax request to open weather
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(response);

        //using moment.js to get current date
        let now = moment();
        //converting kelvin temp to farenheight
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;

        //adding city, temp, humidity, wind, and UV
        $(".city").html('<h2>' + response.name + " (" + now.format('MM-DD-YYYY') + ") </h2>");
        $(".tempF").text('Temperature (F): ' + tempF.toFixed(2));
        $(".humidity").text('Humidity: ' + response.main.humidity + "%");
        $(".wind").text('Wind speed: ' + response.wind.speed + " MPH");
        $(".UV").text('UV Index: ');
    })

    //creating variable for 5-day forecast API
    const queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    console.log(queryURL2);

    $.ajax({
        url:queryURL2,
        method:"GET"
    }).then(function(response){
        console.log(response);

        //pulling information for 5-day forecast
        for (let i = 0; i < response.list.length; i ++){

            let now = moment();
            $('.day' + i).text((now.format('MM-DD-YYYY')));

            //converting temp to F
            let temp = (response.list[i].main.temp - 273.15) * 1.80 + 32;

            $('.temp' + i).text('Temp (F): ' + temp.toFixed(2));
            $('.humid' + i).text('Humidity: ' + response.list[i].main.humidity + '%');
            // $('.temp' + i).text(response.list[i].main.temp );
        }

       



    });
    //     //using moment.js to get current date
    //     let now = moment();
    //     //converting kelvin temp to farenheight
    //     let tempF = (response.main.temp - 273.15) * 1.80 + 32;

    //     //adding city, temp, humidity, wind, and UV
    //     $(".city").html('<h2>' + response.name + " (" + now.format('MM-DD-YYYY') + ") </h2>");
    //     $(".tempF").text('Temperature (F): ' + tempF.toFixed(2));
    //     $(".humidity").text('Humidity: ' + response.main.humidity + "%");
    //     $(".wind").text('Wind speed: ' + response.wind.speed + " MPH");
    //     $(".UV").text('UV Index: ');
    // })


});



   