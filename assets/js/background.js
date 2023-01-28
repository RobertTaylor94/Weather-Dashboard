function updateBackground(response) {
    let conditionMain = response.weather[0].main;

    switch (conditionMain) {
        case "Thunderstorm":
            console.log("Thunderstorm");
            break;
        case "Drizzle":
            console.log("Drizzle");
            break;
        case "Rain":
            console.log("Rain");
            break;
        case "Snow":
            console.log("Snow");
            break;
        case "Clear":
            console.log("Clear");
            break;
        case "Clouds":
            console.log("Clouds");
            break;
        default:
            console.log("no weather main");
            break;
    }
};