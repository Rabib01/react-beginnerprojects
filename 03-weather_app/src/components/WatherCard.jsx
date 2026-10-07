import styles from "./WeatherCard.module.css";

const WeatherCard = ({ weather,city }) => {

  if (!weather) {
    return null;
  }

  const current = weather.current_weather || {};
  const temperature = current.temperature ?? "--";
  const condition = current.weathercode ?? "Unknown";
  const humidity = weather.hourly?.relative_humidity_2m?.[0] ?? "--";
  const wind = current.windspeed ?? "--";
  const feelsLike = current.apparent_temperature ?? temperature;

  // const weatherText =
  //   condition === 0
  //     ? "Clear"
  //     : condition === 1 || condition === 2 || condition === 3
  //       ? "Partly cloudy"
  //       : condition >= 45 && condition <= 48
  //         ? "Fog"
  //         : condition >= 51 && condition <= 67
  //           ? "Rain"
  //           : condition >= 71 && condition <= 77
  //             ? "Snow"
  //             : "Cloudy";
  
  function getWeatherText(condition) {
  if (condition === 0) return "Clear";
  if (condition >= 1 && condition <= 3) return "Partly cloudy";
  if (condition >= 45 && condition <= 48) return "Fog";
  if (condition >= 51 && condition <= 67) return "Rain";
  if (condition >= 71 && condition <= 77) return "Snow";

  return "Cloudy";
}

const weatherText = getWeatherText(condition);


  return (
    <div className={styles.weatherdiv}>
      <h3 className={styles.city}>{city}</h3>
      <p className={styles.temp}>{temperature}°C</p>
      <p className={styles.condition}>{weatherText}</p>

      <div className={styles.details}>
        <div>
          <span>Humidity</span>
          <strong>{humidity}%</strong>
        </div>
        <div>
          <span>Wind</span>
          <strong>{wind} km/h</strong>
        </div>
        <div>
          <span>Feels like</span>
          <strong>{feelsLike}°C</strong>
        </div>
      </div>
    </div>
  );

  
};

export default WeatherCard;

  // less dumg version 
const weatherConditions = {
  clear: condition === 0 && "Clear",
  partlyCloudy:
    (condition === 1 || condition === 2 || condition === 3) &&
    "Partly cloudy",
  fog: condition >= 45 && condition <= 48 && "Fog",
  rain: condition >= 51 && condition <= 67 && "Rain",
  snow: condition >= 71 && condition <= 77 && "Snow",
};

const weatherText =
  weatherConditions.clear ||
  weatherConditions.partlyCloudy ||
  weatherConditions.fog ||
  weatherConditions.rain ||
  weatherConditions.snow ||
  "Cloudy";

// prduction worthy 
function getWeatherText(condition) {
  if (condition === 0) return "Clear";
  if (condition >= 1 && condition <= 3) return "Partly cloudy";
  if (condition >= 45 && condition <= 48) return "Fog";
  if (condition >= 51 && condition <= 67) return "Rain";
  if (condition >= 71 && condition <= 77) return "Snow";

  return "Cloudy";
}

const weatherText = getWeatherText(condition);
