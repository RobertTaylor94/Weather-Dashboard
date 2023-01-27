//document selectors
let searchButton = $("#search-button");
let searchInput = $("#search-input");
let searchHistory = $("#history");


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
      saveSearch(cityName)
    });

    searchInput.val("");
}

function saveSearch(city) {
    let newCity = $("<button>").text(city);
    newCity.attr("class", "btn btn-info saved-city");
    newCity.attr("data-name", city);
    searchHistory.append(newCity);
}

function retrieveSearch(event) {
    let cityName = $(event.target).attr("data-name");
    
}

//event listeners
searchButton.on("click", search);
searchHistory.on("click", ".saved-city", retrieveSearch);