
const apiKey = "302462f81ff9a64a73ec7485b328cbb8";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      //  Move this block inside the function
      if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/snow.png";
      } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
      } else {
        weatherIcon.src = "images/clear.png"; 
      }

    } else {
      document.querySelector(".city").innerHTML = "City not found ";
      document.querySelector(".temp").innerHTML = "--";
      document.querySelector(".humidity").innerHTML = "--";
      document.querySelector(".wind").innerHTML = "--";
      weatherIcon.src = "images/error.png"; 
      console.error("API error:", data.message);
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  } else {
    alert("Please enter a city name ");
  }
});
