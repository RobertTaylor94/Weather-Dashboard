let currentCardBody = $('#current-body')

function updateBackground(response) {
    let conditionMain = response.list[0].weather[0].main;

    switch (conditionMain) {
        case "Thunderstorm":
            currentCardBody.css("background-color", "#4e5561");
            console.log("Thunderstorm");
            break;
        case "Drizzle":
            console.log("Drizzle");
            currentCardBody.css("background-color", "#7fa3db");
            break;
        case "Rain":
            console.log("Rain");
            currentCardBody.css("background-color", "#6079a1");
            break;
        case "Snow":
            console.log("Snow");
            currentCardBody.css("background-color", "#e6e9ed");
            break;
        case "Clear":
            console.log("Clear");
            currentCardBody.css("background-color", "#80bfd9");
            break;
        case "Clouds":
            console.log("Clouds");
            currentCardBody.css("background-color", "#969ba3");
            break;
        default:
            console.log("no weather main");
            currentCardBody.css("background-color", "#80bfd9");
            break;
    }
};