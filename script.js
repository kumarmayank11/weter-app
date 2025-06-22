const apiKey = "9ce1c05d98898ccdbf2b4fe0bead8fd4"; // Replace with your OpenWeatherMap API key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const result = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
          <p>🌡️ Temp: ${data.main.temp}°C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherResult").innerHTML = result;
      } else {
        document.getElementById("weatherResult").innerHTML = `<p>City not found.</p>`;
      }
    })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = `<p>Failed to fetch data.</p>`;
    });
}
