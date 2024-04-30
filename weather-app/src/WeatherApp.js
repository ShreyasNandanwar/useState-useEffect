import React, { useState, useEffect } from 'react'
import './WeatherApp.css';
const WeatherApp = () => {

  const [weather, setWeather] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch('http://api.weatherapi.com/v1/current.json?key=5dd80c3b220a4ab1a0a73615243004&q=London')
      if (!response.ok) {
        throw new Error('Failed to fetch weatherAPI');
      }
      const data = await response.json();

      setWeather(data);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);


  return (
    <div className='main'>
      <h1>
        Weather App
      </h1>

      {weather ? (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature_C : {weather.current.temp_c}</p>
          <p>Temperature_F : {weather.current.temp_f}</p>
          <div className='condition'>
            <img src={weather.current.condition.icon} />
            <p>{weather.current.condition.text}</p>
          </div>
        </div>
      ) : (<p>loading....</p>)}
    </div>
  )
}

export default WeatherApp
