//document selectors
let searchButton = $("#search-button");
let searchInput = $("#search-input");
let searchHistory = $("#history");
let clearButton = $("#clear-button");
let weatherMain = $("#weather-main");
let currentConditionIcon = $("#current-condition-image");
let currentTemp = $("#current-temp");
let currentWind = $("#current-wind");
let currentHumidity = $("#current-humid");
let selectedCity = $("#city-name");
let dateToday = $("#date-today");
let cardDeck = $("#card-deck");

//functions
function search(event) {
  event.preventDefault();
  //set city name to the user input in the search field
  let cityName = searchInput.val().trim();
  if (cityName === "") {
    //if no city entered show error alert
    alert("Please enter a city name");
    return;
  }

  //run the API request with the city name to get current weather
  $.ajax({
    url: queryURLCurrent + cityName + apiKey,
    method: "GET",
  }).then(function (response) {
    //show the clear button when a city is in the history
    clearButton.attr("class", "btn btn-danger");
    //save the search
    saveSearch(cityName);
    //render the current weather
    renderCurrentWeather(response);
    // updateBackground(response);
    renderWeatherForecast(response);
  });

  searchInput.val("");
}

function saveSearch(city) {
  //create new button to show previously made search
  let newCity = $("<button>").text(city);
  newCity.attr("class", "btn btn-info mt-2 saved-city");
  //add dataset name to the button storing the city name
  newCity.attr("data-name", city);
  //append the button to the search history list
  searchHistory.append(newCity);
}

function retrieveSearch(event) {
  //fetch the saved city name from the data set
  let savedCity = $(event.target).attr("data-name");
  //fetch weather from API call using the saved city name
  $.ajax({
    url: queryURLCurrent + savedCity + apiKey,
    method: "GET",
  }).then(function (response) {
    renderCurrentWeather(response);
    renderWeatherForecast(response);
    // updateBackground(response);
  });
}

function renderCurrentWeather(response) {
  let currentWeather = response.list[0]
  let tempInC = currentWeather.main.temp - 273.15;
  let rounded = Math.round(tempInC * 10) / 10;

  weatherMain.attr("class", "col-lg-9 pb-3");
  selectedCity.text(response.city.name);
  dateToday.text(moment().format("Do MMMM"));
  iconCode = currentWeather.weather[0].icon;
  currentConditionIcon.attr(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  currentTemp.text(rounded);
  currentHumidity.text(currentWeather.main.humidity);
  currentWind.text(currentWeather.wind.speed);
}

function renderWeatherForecast(response) {
  cardDeck.empty();
  for (i = 0; i < 5; i++) {
    let forecastDate = `${moment().add(i + 1, "d").format("YYYY-MM-DD")} 12:00:00`
    let forecast = response.list.filter(obj => obj.dt_txt === forecastDate);
    let date = moment().add(i + 1, "d").format("Do MMMM")

    console.log(forecast)

    cardDeck.append(renderForecastCard(date, forecast[0]))
  }
}

function renderForecastCard(date, forecast) {
  let tempInC = forecast.main.temp - 273.15;
  let rounded = Math.round(tempInC * 10) / 10;
  let newCard = $("<div>").attr("class", "card");
  let header = $("<div>").attr("class", "card-header");
  let headerTitle = $("<h5>").text(date);
  let weatherIcon = $("<img>").attr("class", "card-img-top");
  // let weatherIconCode = forecast.weather.icon;
  weatherIcon.attr("src", `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
  let temp = $("<p>").attr("class", "card-text mx-auto");
  temp.text(`Temp: ${rounded}°C`)
  let wind = $("<p>").attr("class", "card-text mx-auto");
  wind.text(`Wind: ${forecast.wind.speed} mph`)
  let humid = $("<p>").attr("class", "card-text mx-auto pb-2");
  humid.text(`Humidity: ${forecast.main.humidity}%`)
  header.append(headerTitle);
  newCard.append(header, weatherIcon, temp, wind, humid);

  return newCard;
}

//event listeners
searchButton.on("click", search);
searchHistory.on("click", ".saved-city", retrieveSearch);
clearButton.on("click", function (event) {
  event.preventDefault();
  //remove all saved searches
  searchHistory.empty();
  //hide the clear button and weather when the search history is empty
  clearButton.attr("class", "btn btn-danger d-none");
  weatherMain.attr("class", "col-lg-9 pb-3 d-none");
});