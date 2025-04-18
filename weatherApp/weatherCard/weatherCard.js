const API_KEY = "664a81171bc84ee7b1673403250404"; // Replace with your WeatherAPI key
const BASE_URL = "https://api.weatherapi.com/v1/";
const weatherCard = document.querySelector(".weather-card");

const searchIcon = document.querySelector(".searchIcon");
const searchBox = document.querySelector(".searchBox");
const searchInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");

document.addEventListener("DOMContentLoaded", async () => {
  const defaultCity = "Singapore"; // Default city
  await getWeather(defaultCity);

  // Use event delegation to handle the button click
  document.body.addEventListener("click", (event) => {
    if (event.target && event.target.id === "searchButton") {
      const city = document.querySelector("#cityInput").value;
      if (city) {
        getWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    }
  });
});

async function getWeather(query) {
  if (!query) {
    alert("Please enter a location!");
    return;
  }

  const current_url = `${BASE_URL}current.json?key=${API_KEY}&q=${query}`;
  const forecast_url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no&alerts=no`;

  try {
    const current_response = await fetch(current_url);
    const forecast_response = await fetch(forecast_url);
    const data = await current_response.json();
    const forecastData = await forecast_response.json();
    console.log(forecastData);

    if (data.error || forecastData.error) {
      // Handle error response
      weatherCard.innerHTML = `<p>${data.error.message}</p>`;
      return;
    }

    const today = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString(undefined, options);

    const hourlyForecast = forecastData.forecast.forecastday[0].hour
      .map((hour, index) => {
        return `
        <div class="forecast-item">
          <div class="forecast-time">${
            index === 0 ? "Now" : `${hour.time.split(" ")[1]}`
          }</div>
          <img src="${
            hour.condition.icon
          }" alt="Weather Icon" class="forecast-icon" />
          <div class="forecast-temp">${hour.temp_c}°</div>
        </div>
      `;
      })
      .join("");

    weatherCard.innerHTML = `

    <div class="app-container">
      <!-- Location Bar -->
      <div class="location-bar">
        <div class="location">
          ${data.location.name}, ${data.location.region}
        </div>
      </div>

      <!-- Main Weather Display -->
      <div class="main-weather">
        <div class="date">${formattedDate}</div>
        <div class="temp-container">
        <img src="${
          data.current.condition.icon
        }" alt="Weather Icon" class="weather-icon" />
        <div class="temperature">${data.current.temp_c}°</div>
        </div>
        <div class="weather-condition">${data.current.condition.text}</div>
        <div>Feels like ${data.current.feelslike_c}°</div>

        <!-- Weather Details -->
        <div class="weather-details">
        <div class="detail">
          <svg class="detail-icon" viewBox="0 0 24 24" fill="white">
          <path
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          />
          </svg>
          <div class="detail-value">${data.current.precip_mm}mm</div>
          <div class="detail-label">Precipitation</div>
        </div>
        <div class="detail">
          <svg class="detail-icon" viewBox="0 0 24 24" fill="white">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"
          />
          </svg>
          <div class="detail-value">${data.current.humidity}%</div>
          <div class="detail-label">Humidity</div>
        </div>
        <div class="detail">
          <svg class="detail-icon" viewBox="0 0 24 24" fill="white">
          <path d="M12 3.6L9 8.4l3 2.4-3 2.4 3 4.8 3-4.8-3-2.4 3-2.4z" />
          </svg>
          <div class="detail-value">${data.current.wind_mph} mph</div>
          <div class="detail-label">Wind</div>
        </div>
        <div class="detail">
          <svg class="detail-icon" viewBox="0 0 24 24" fill="white">
          <path
            d="M12 7.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0-5C8.96 2.5 6.5 4.96 6.5 8c0 1.77.84 3.34 2.15 4.34.39-.81.77-1.76.77-2.34 0-1.66 1.34-3 3-3s3 1.34 3 3c0 .58.38 1.53.77 2.34 1.31-1 2.15-2.57 2.15-4.34 0-3.04-2.46-5.5-5.5-5.5z"
          />
          </svg>
          <div class="detail-value">${data.current.uv}</div>
          <div class="detail-label">UV Index</div>
        </div>
        </div>
      </div>

      <!-- Forecast Section -->
      <div class="forecast-section">
        <div class="section-title">Hourly Forecast</div>
        <div class="hourly-forecast">
        ${hourlyForecast}
        </div>

        <div class="section-title" style="margin-top: 20px;">7-Day Forecast</div>
        <div class="daily-forecast">
        ${forecastData.forecast.forecastday
          .map((day, index) => {
            const dayName =
              index === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString(undefined, {
                    weekday: "long",
                  });
            return `
          <div class="daily-item">
            <div class="day-name">${dayName}</div>
            <img src="${day.day.condition.icon}" alt="Weather Icon" class="day-forecast-icon" />
            <div class="temp-range">${day.day.mintemp_c}° / ${day.day.maxtemp_c}°</div>
          </div>
          `;
          })
          .join("")}
        </div>
      </div>
    </div>
    `;
  } catch (error) {
    weatherCard.innerHTML = `<p>Failed to fetch weather data.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const defaultCity = "Singapore"; // Default city
  getWeather(defaultCity);
});
