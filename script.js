const searchBtn = document.getElementById("search-btn");
const inputText = document.getElementById("city-input");
const getLocationBtn = document.getElementById("get-location-btn");
const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const currentTime = document.getElementById("current-time");

async function getData(location) {
  let url;
  let locationType = typeof location;
  switch (locationType) {
    case "string":
      url = `http://api.weatherapi.com/v1/current.json?key=eb55f44cdf4048a2a09114253241202&q=${location}&aqi=yes`;
      break;
    case "object":
      url = `http://api.weatherapi.com/v1/current.json?key=eb55f44cdf4048a2a09114253241202&q=${location.latitude},${location.longitude}&aqi=yes`;
      break;
    default:
      console.log("Invalid location format");
  }
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const result = await getData({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      displayWeatherData(result);
    },
    (error) => {
      console.log(`Error getting current position:', ${error}`);
    }
  );
});

searchBtn.addEventListener("click", async () => {
  let value = inputText.value;
  let result = await getData(value);
  displayWeatherData(result);
});

function displayWeatherData(result) {
  console.log(result);
  cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
  cityTime.innerText = `${result.location.localtime}`;
  cityTemp.innerText = `${result.current.temp_c}° celsius`;
}
