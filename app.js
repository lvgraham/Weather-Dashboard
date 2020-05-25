let searchBtn = document.querySelector('#searchWeather')

function searchCity(){

    let city = $('#cityName').val()

    const APIKey = "d367dcfadab5440b10dca09382825e01";
    const queryURL = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    
    if (city != ''){

        $.ajax({
            url:queryURL,
            method:"get"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
        
        })

    }else{

    }
  
}

searchBtn.addEventListener("click", searchCity());



    //start of the forloop to create the 5-day forecast
    // for(i = 5; i <= 5; i++){

    // }