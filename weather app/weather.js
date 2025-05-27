const apiKey ="8205e670c1e4efcc4394e257d2697ea2";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (!response.ok) {
  throw new Error("City not found");
  }
  var data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed +" km/h";

  const weather = data.weather[0].main;

  if (data.weather[0].main === "Clouds"){
    weatherIcon.src = "weather-app-img (1)/images/clouds-png";
  } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "weather-app-img (1)/images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "weather-app-img (1)/images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "weather-app-img (1)/images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "weather-app-img (1)/images/mist.png";
    }
  
    document.querySelector(".weather").Style.display ="block";
  }

  searchBtn.addEventListener("click", ()=> {
  checkWeather(searchBox.value);  
  });
  
  checkWeather("Nigeria");