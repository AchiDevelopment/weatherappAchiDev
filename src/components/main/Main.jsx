import React, { useEffect, useState } from "react";
import "./main.css";

const Main = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const fetchData = async (param) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8ae80676a5e26feb8d5e80ba7adbda2d
        `
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(search);
    setSearch("");
    console.log(search);
    console.log(weatherData);
  };

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Submit</button>
          {weatherData && weatherData.name ? (
            <div className="weather-info-container">
              <div className="name">
                <h2>{weatherData.name},</h2>
                <h2 className="country">{weatherData.sys.country}</h2>
              </div>
              <div className="info">
                <p>
                  Temperature : {(weatherData.main.temp - 273.15).toFixed(2)} °C
                </p>
                <p>
                  Feels like :{" "}
                  {(weatherData.main.feels_like - 273.15).toFixed(2)}
                </p>
                <p>Humidity : {weatherData.main.humidity}</p>
                <p>Main : {weatherData.weather[0].main}</p>
                <p>description : {weatherData.weather[0].description}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default Main;
