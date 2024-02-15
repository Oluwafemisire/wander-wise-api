import "./WeatherForecast.css";
import { useContext, useState } from "react";
import { AppContext } from "/src/App";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const WEATHER_MAP_API = import.meta.env.VITE_WEATHER_MAP_API;

async function getWeather(lon, lat) {
  try {
    const req = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lon=" +
        lon +
        "&lat=" +
        lat +
        "&appid=" +
        WEATHER_MAP_API +
        "&units=metric"
    );
    const data = await req.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function WeatherForecast() {
  const [description, setDescription] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [temp, setTemp] = useState();
  const [city, setCity] = useState();
  const [weatherConditon, setWeatherCondition] = useState('clear sky')
  const [forecastItems, setForcastItems] = useState([]);

  const { location } = useContext(AppContext);
  const lon = location.longitude;
  const lat = location.latitude;

  const { data, status } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather(lon, lat),
  });
  console.log(status);
  useEffect(() => {
    if (status === "success") {
      console.log(data);
      const currentweather = data.list[0];
      setDescription(currentweather.weather[0].description);
      setWind(currentweather.wind.speed);
      setTemp(currentweather.main.temp);
      setHumidity(currentweather.main.humidity);
      setCity(data.city.name);

      const items = data.list
        .filter((item, index) => index % 8 === 0 && item.weather[0].description === weatherConditon)
        .map((item, index) => {
          return (
            <div key={index} className="forecast-item">
              <p>{item.main.temp}°C</p>
              <p>{item.main.humidity}% Humidity</p>
              <p>{item.weather[0].description}</p>
              <p>{item.wind.speed} Kmph Wind</p>
            </div>
          );
        });
      setForcastItems(items);
    }
  }, [status, data, weatherConditon]);

  return (
    <div className="weather-card">
      <h1>{city}</h1>
      <div className="stat-card">
        <h3>{temp}&#8451;</h3>
        <p>{description}</p>
        <p>Wind: {wind} Km/h</p>
        <p>Humidity: {humidity}%</p>
      </div>
      <div>
        <hr />
      </div>
      <div>
        <label>
          Filter by Weather Condition:
          <select value={weatherConditon} onChange={(e)=> setWeatherCondition(e.target.value)}>
            <option value="clear sky">Clear Sky</option>
            <option value="few clouds">Few Clouds</option>
            <option value="scattered clouds">Scattered Clouds</option>
            <option value="broken clouds">Broken Clouds</option>
            <option value="shower rain">Shower Rain</option>
            <option value="rain">Rain</option>
            <option value="thunderstorm">Thunderstorm</option>
            <option value="snow">Snow</option>
            <option value="mist">Mist</option>
          </select>
        </label>
      </div>
      <div className="forecast">{forecastItems}</div>
    </div>
  );
}

export default WeatherForecast;
