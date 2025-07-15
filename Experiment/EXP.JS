const apiKey = "8205e670c1e4efcc4394e257d2697ea2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    const weather = data.weather[0].main;
    let iconSrc = "";

    switch (weather) {
      case "Clouds":
        iconSrc = "weather-app-img (1)/images/clouds.png";
        break;
      case "Clear":
        iconSrc = "weather-app-img (1)/images/clear.png";
        break;
      case "Rain":
        iconSrc = "weather-app-img (1)/images/rain.png";
        break;
      case "Drizzle":
        iconSrc = "weather-app-img (1)/images/drizzle.png";
        break;
      case "Mist":
        iconSrc = "weather-app-img (1)/images/mist.png";
        break;
      default:
        iconSrc = "weather-app-img (1)/images/default.png"; // fallback icon
    }
    weatherIcon.src = iconSrc;
    weatherIcon.alt = weather;

    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    alert("Failed to fetch weather data. Try again later.");
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() !== "") {
    checkWeather(searchBox.value.trim());
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchBox.value.trim() !== "") {
    checkWeather(searchBox.value.trim());
  }
});

// Show weather for a default city on page load
checkWeather("New York");
