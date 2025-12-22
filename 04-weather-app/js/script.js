const apiKey = "b41339c43eaeed19112f006e0626cc8e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");
const weatherInfo = document.querySelector(".weather-info");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorMessage.style.display = "block";
    weatherInfo.style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").textContent = data.name + ", " + data.sys.country;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "km/j";

    const condition = data.weather[0].main;

    if (condition == "Clouds") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        } else if (condition == "Clear") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if (condition == "Rain") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
        } else if (condition == "Drizzle") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
        } else if (condition == "Mist") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        } else if (condition == "Snow") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/2315/2315309.png";
        }

        errorMessage.style.display = "none";
        weatherInfo.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchInput.value)
  }
})