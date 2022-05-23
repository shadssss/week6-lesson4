// 1 display current day and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let realTime = document.querySelector(".actual-day-time");

realTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

// 2 search city input

//function search(event) {
//event.preventDefault();
//let searchInput = document.querySelector("#search-city-input");
//let h3 = document.querySelector("#h3-london");
//h3.innerHTML = searchInput.value;
//}

//let searchForm = document.querySelector("#search-form");

//searchForm.addEventListener("submit", search);

// 3 Show temperature change from celsius to farenheit

//function celsius(event) {
//event.preventDefault();
//let celsiusTemperature = document.querySelector("#current-temp");
//celsiusTemperature.innerHTML = 13;
//}

//function fahrenheit(event) {
//event.preventDefault();
//let fahrenheitTemperature = document.querySelector("#current-temp");
//fahrenheitTemperature.innerHTML = Math.round((13 * 9) / 5 + 32);
//}

//let celsiusLink = document.querySelector("#celsius-temp");
//celsiusLink.addEventListener("click", celsius);

//let fahrenheitLink = document.querySelector("#fahrenheit-temp");
//fahrenheitLink.addEventListener("click", fahrenheit);

// 4 search city and real current temperature

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let city = cityInput.value;
  let apiKey = "2f6e65972b364005048a48f3b792c599";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveWeather);
}

function retrieveWeather(response) {
  let h3 = document.querySelector("#h3-london");
  h3.innerHTML = response.data.name;
  let temperature = document.querySelector("#current-temp");
  let degrees = Math.round(response.data.main.temp);
  temperature.innerHTML = `${degrees}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = wind.innerHTML = Math.round(response.data.wind.speed);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// 5 Current location button

function locationSearch(place) {
  place.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentWeather);
}

function retrieveCurrentWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "2f6e65972b364005048a48f3b792c599";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveWeather);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", locationSearch);
