//document selectors
let searchButton = $("#search-button");
let searchInput = $("#search-input");
let searchHistory = $("#history");
let clearButton = $("#clear-button");


//functions
function search(event) {
    event.preventDefault()
    //set city name to the user input in the search field
    let cityName = searchInput.val().trim();
    if (cityName === "") {
        //if no city entered show error alert
        alert("Please enter a city name");
        return;
    };

    //run the API request with the city name to get current weather
    $.ajax({
      url: queryURLCurrent + cityName + apiKey,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      clearButton.attr("class", "btn btn-danger")
      saveSearch(cityName)
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
      });
}

function renderCurrentWeather() {

}

//event listeners
searchButton.on("click", search);
searchHistory.on("click", ".saved-city", retrieveSearch);
clearButton.on("click", function (event) {
    event.preventDefault();
    //remove all saved searches
    searchHistory.empty();
    //hide the clear button when the search history is empty
    clearButton.attr("class", "btn btn-danger d-none")
});