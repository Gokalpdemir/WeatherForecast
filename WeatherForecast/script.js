const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const weatherDiv = document.getElementById("weather");
const iconDiv = document.getElementById("icon");
const temperatureDiv = document.getElementById("temperature");
const descriptionDiv = document.getElementById("description");
const detailDiv = document.getElementById("detail");

const apiKey = "abf9b3010e80c0698b77f454515cb9ae";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    const details = [
      `Hissedilen  : ${Math.round(data.main.temp.feels_like)}`,
      `Nem Oranı : ${data.main.humidity}%`,
      `Rüzgar : ${data.wind.speed} m/s`,
    ];

    iconDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    temperatureDiv.textContent = `${temperature}°C`;
    descriptionDiv.textContent = "";
    const newDetails = details
      .map((detail) => {
        return `<div>${detail}</div>`;
      })
      .join("");
    detailDiv.innerHTML = newDetails;
  } catch (error) {
    iconDiv.innerHTML = "";
    temperatureDiv.textContent = "";
    descriptionDiv.textContent = "Lütfen Geçerli Bir Şehir Giriniz";
    detailDiv.innerHTML = "";
  }
}
