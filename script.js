var searchInputEl = document.getElementById("city-search")
var searchButtonEl = document.getElementById("search-btn")
var currentWeatherDivEl = document.getElementById("current-weather")
var futureWeatherDivEl = document.getElementById("future-weather")
var day2DivEl = document.getElementById("day-2")
var day3DivEl = document.getElementById("day-3")
var day4DivEl = document.getElementById("day-4")
var day5DivEl = document.getElementById("day-5")
var day6DivEl = document.getElementById("day-6")
var dayDivArr = [day2DivEl, day3DivEl, day4DivEl, day5DivEl, day6DivEl]
var searchDivEl = document.getElementById("prev-search")


var apiKey = "25ccde466861620de2e2d72d2d7d4569"

function resultFetch (event){
    
    searchInputEl.value = "hello"
    console.log("hello")
}

function getCity (event){
    
    event.preventDefault()
    var cityName = searchInputEl.value
    
    var cityHeading = document.createElement("h2")
    cityHeading.textContent = cityName
    cityHeading.id = ("city-heading")
    currentWeatherDivEl.append(cityHeading)

    currentSearch = document.createElement("button")
    currentSearch.textContent = cityName
    currentSearch.id = cityName
    currentSearch.id = "result"
    searchDivEl.append(currentSearch)
    // currentSearch.setAttribute("href", "google.com")
    


    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => getWeatherData(data))

        searchInputEl.value = ""
}

function getWeatherData (data){

    var latitude = data[0].lat
    var longitude = data[0].lon

    var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`

    fetch(apiUrl2)
        .then(response => response.json())
        .then (data => renderWeather(data))
}

function renderWeather (data){
    console.log(data)

    // convert date from unix timestamp
    const unixTimeStampFromApi = data.current.dt
    const milliseconds = unixTimeStampFromApi * 1000
    const dateObject = new Date(milliseconds)
    const dateArr = dateObject.toLocaleString().split(',')
    
    const date = dateArr[0]
    const temp = data.current.temp
    const wind = data.current.wind_speed
    const humidity = data.current.humidity
    const uvIndex =data.current.uvi

    // Appending date to existing city heading in the DOM
    const cityHeadingDom = document.getElementById ("city-heading")
    const existingCityString = cityHeadingDom.textContent
    cityHeadingDom.textContent = existingCityString + ' ' + date

    const currentWeatherInfo = document.createElement("div")
    currentWeatherDivEl.appendChild(currentWeatherInfo)
    
    const currentWeatherTemp = document.createElement("p")
    currentWeatherTemp.textContent = "Temp: " + temp + "F"
    currentWeatherInfo.appendChild(currentWeatherTemp)

    const currentWeatherWind = document.createElement("p")
    currentWeatherWind.textContent = "Wind: " + wind + " mph"
    currentWeatherInfo.appendChild(currentWeatherWind)

    const currentWeatherHumidity = document.createElement("p")
    currentWeatherHumidity.textContent = "Humidity: " + humidity + "%"
    currentWeatherInfo.appendChild(currentWeatherHumidity)

    const currentWeatherUvIndex = document.createElement("p")
    currentWeatherUvIndex.textContent = "Uv Index: " + uvIndex 
    currentWeatherInfo.appendChild(currentWeatherUvIndex)

    if(uvIndex <= 2){
        currentWeatherUvIndex.style.color = "green"
    }else if(uvIndex > 2 && uvIndex < 7){
        currentWeatherUvIndex.style.color = "#9b870c"
    }else if(uvIndex >= 7){
        currentWeatherUvIndex.style.color = "red"
    }

    for(i=0; i < 5; i++){
        currentDiv = dayDivArr[i]

        var unixDaily = data.daily[i+1].dt
        var millisecondsDaily = unixDaily * 1000
        var dateObjectDaily = new Date(millisecondsDaily)
        var dateArrDaily = dateObjectDaily.toLocaleString().split(',')

        var dateDaily = dateArrDaily[0]
        var tempDaily = data.daily[i+1].temp.day
        var windDaily = data.daily[i+1].wind_speed
        var humidityDaily = data.daily[i+1].humidity
        var dailyIconId = data.daily[i+1].weather[0].icon

        var dateDailyH = document.createElement("h4")
        dateDailyH.textContent = dateDaily
        currentDiv.append(dateDailyH)

        var dailyIcon = document.createElement("img")
        console.log(dailyIconId)
        dailyIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dailyIconId + "@2x.png")
        currentDiv.append(dailyIcon)

        var tempDailyP = document.createElement("p")
        tempDailyP.textContent = "Temp: " + tempDaily + " F"
        currentDiv.append(tempDailyP)

        var windDailyP = document.createElement("p")
        windDailyP.textContent = "Wind: " + windDaily + " MPH"
        currentDiv.append(windDailyP)

        var humidityDailyP = document.createElement("p")
        humidityDailyP.textContent = "Humidity: " + humidityDaily + "%"
        currentDiv.append(humidityDailyP)
    }
}




searchButtonEl.addEventListener("click", getCity)

prevResult = document.getElementById("result")


