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
    console.log(response);
    renderCurrentWeather(response);
  });
}

function renderCurrentWeather(response) {
  console.log(response.main.temp);
  console.log(response.main.humidity);
  console.log(response.weather[0].description);
  console.log(response.wind.speed);
  console.log(response.weather[0].icon);

  var tempInC = response.main.temp - 273.15;
  var rounded = Math.round(tempInC * 10) / 10;

  weatherMain.attr("class", "col-lg-9 pb-3");
  selectedCity.text(response.name);
  iconCode = response.weather[0].icon;
  currentConditionIcon.attr(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  currentTemp.text(rounded);
  currentHumidity.text(response.main.humidity);
  currentWind.text(response.wind.speed);
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
