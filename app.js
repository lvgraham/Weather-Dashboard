let searchBtn = document.querySelector('#searchWeather')

//need to get the city name from the search bar
let cityName = document.getElementById('cityName');

//defining an array to store previous searches
let prevSearches = []

//function to show the last city searched when page is loaded//
$(document).ready(function(){
    if (localStorage.getItem("previousSearches")){
        prevSearches = JSON.parse(localStorage.getItem("previousSearches"))
    }

    let searchedCity = $('<div>'); 
        searchedCity.text(prevSearches[0])

 
    const APIKey = "d367dcfadab5440b10dca09382825e01";
    //setting query URL value
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + prevSearches[0] + "&appid=" + APIKey;

    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){

        //using moment.js to get current date
        let now = moment();
        //converting kelvin temp to farenheight
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;

        //adding city, temp, humidity, wind, and UV
        $(".city").html('<h2>' + response.name + " (" + now.format('MM-DD-YYYY') + ") </h2>");
        $(".tempF").text('Temperature (F): ' + tempF.toFixed(2));
        $(".humidity").text('Humidity: ' + response.main.humidity + "%");
        $(".wind").text('Wind speed: ' + response.wind.speed + " MPH");

        //setting longitude and lattitude coordinates to use UV API
        let lat = response.coord.lat;
        let lon = response.coord.lon;
                
        //setting variable for UV URL
        let uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

        //ajax request for UV data
        $.ajax({
            url: uvURL,
            method: 'GET'
        }).then(function(uvresponse){

            let uv = uvresponse.value;

            //adding UV data to current weather information
            $(".uvText").text('UV Index: ');
            $('.UV').html(uv);

            if (uv < 3){
                $('.UV').addClass('low')
            }else if (uv > 3 && uv < 6){
                $('.UV').addClass('medium')
            }else if (uv > 6 && uv < 8){
                $('.UV').addClass('high')
            }else if (uv > 8 || uv < 11){
                $('.UV').addClass('vHigh')
            }else {
                $('.UV').addClass('extreme')
            }

        }) 

    })

    //creating variable for 5-day forecast API
    const queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + prevSearches[0] + "&appid=" + APIKey;
    console.log(queryURL2);
    
    //pulling 5-day forecast data
    $.ajax({
        url:queryURL2,
        method:"GET"
    }).then(function(response){
        console.log(response);
    
        //for loop to add the 5-day forcast to page
        for (let i=0; i< response.list.length; i++){

            //converting temp to F
            let temp = (response.list[i].main.temp - 273.15) * 1.80 + 32;
    
            //showing the future dates
            let now = moment().add([i+1], 'days');
            $('.day' + i).text((now.format('MM-DD-YYYY')));
    
            //displaying the icons
            let iconURL = 'https://openweathermap.org/img/wn/';
            let icon = iconURL + response.list[i].weather[0].icon + '@2x.png';
            console.log(icon)
            $('.icon' + i).attr('src', icon);
    
            //adding the temperatures + humidity
            $('.temp' + i).text('Temp (F): ' + temp.toFixed(2));
            $('.humid' + i).text('Humidity: ' + response.list[i].main.humidity + '%');
            // $('.temp' + i).text(response.list[i].main.temp );
    
        }
    });
})

       


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//search button onclick event
searchBtn.addEventListener("click", function(){

    event.preventDefault();

    //setting city name from value entered in search box
    let city = cityName.value;

    if (!prevSearches.includes(city)){
        prevSearches.push(city);
    }

    //setting apikey variable
    const APIKey = "d367dcfadab5440b10dca09382825e01";
    //setting query URL value
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    //pulling current weather data from open weather API
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){

        //using moment.js to get current date
        let now = moment();
        //converting kelvin temp to farenheight
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;

        //adding city, temp, humidity, wind, and UV
        $(".city").html('<h2>' + response.name + " (" + now.format('MM-DD-YYYY') + ") </h2>");
        $(".tempF").text('Temperature (F): ' + tempF.toFixed(2));
        $(".humidity").text('Humidity: ' + response.main.humidity + "%");
        $(".wind").text('Wind speed: ' + response.wind.speed + " MPH");

        //setting longitude and lattitude coordinates to use UV API
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        
        //setting variable for UV URL
        let uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

        //ajax request for UV data
        $.ajax({
            url: uvURL,
            method: 'GET'
        }).then(function(uvresponse){

            let uv = uvresponse.value;

            //adding UV data to current weather information
            $(".uvText").text('UV Index: ');
            $('.UV').html(uv);

            if (uv < 3){
                $('.UV').addClass('low')
            }else if (uv > 3 && uv < 6){
                $('.UV').addClass('medium')
            }else if (uv > 6 && uv < 8){
                $('.UV').addClass('high')
            }else if (uv > 8 || uv < 11){
                $('.UV').addClass('vHigh')
            }else {
                $('.UV').addClass('extreme')
            }

        })

        $("#searched-cities").empty()

        for(let i=0; i < prevSearches.length; i++){
            console.log("prev search", prevSearches);
            let searchedCity = $('<div>'); 
            searchedCity.text(prevSearches[i])
            $("#searched-cities").append(searchedCity)

        }
    

        //local storage// 
        window.localStorage.setItem("previousSearches", JSON.stringify(prevSearches))

    });
    

    //creating variable for 5-day forecast API
    const queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    console.log(queryURL2);

    //pulling 5-day forecast data
    $.ajax({
        url:queryURL2,
        method:"GET"
    }).then(function(response){
        console.log(response);

        //for loop to add the 5-day forcast to page
        for (let i=0; i< response.list.length; i++){

            //converting temp to F
            let temp = (response.list[i].main.temp - 273.15) * 1.80 + 32;

            //showing the future dates
            let now = moment().add([i+1], 'days');
            $('.day' + i).text((now.format('MM-DD-YYYY')));

            //displaying the icons
            let iconURL = 'https://openweathermap.org/img/wn/';
            let icon = iconURL + response.list[i].weather[0].icon + '@2x.png';
            console.log(icon)
            $('.icon' + i).attr('src', icon);

            //adding the temperatures + humidity
            $('.temp' + i).text('Temp (F): ' + temp.toFixed(2));
            $('.humid' + i).text('Humidity: ' + response.list[i].main.humidity + '%');
            // $('.temp' + i).text(response.list[i].main.temp );

        }
    });
});