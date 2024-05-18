import React, { useState, useEffect } from 'react'
import './WeatherApp.css';
const WeatherApp = () => {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeatherbyCity = async (city) => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`)
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

  const fetchWeatherbyLocation = async (latitude, longitude) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5dd80c3b220a4ab1a0a73615243004&q=${latitude},${longitude}`);
    if(!response.ok){
      throw new Error('failed to fetch api');
    }

    const data = await response.json();
    setWeather(data);
  }

  const getLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherbyLocation(latitude, longitude);
      },(error) => {
        console.error(error);
      });
    }else {
      console.error(`geolocation is not supported by the browser`); 
    }
  };


  useEffect(() => {
    if(city){
      fetchWeatherbyCity(city);
    }
    else{
      getLocation();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(city){
      fetchWeatherbyCity(city);
    }
  };

  return (
    <div className='main'>
      <h1>
        Weather App
      </h1>
      <form
        onSubmit={handleSubmit}
      >
        <input 
        type='text'
        value={city}
        placeholder='Enter city name....'
        onChange={(e) => setCity(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      {weather ? (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature_C : {weather.current.temp_c}</p>
          <p>Temperature_F : {weather.current.temp_f}</p>
          <div className='condition'>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            <p>{weather.current.condition.text}</p>
          </div>
        </div>
      ) : (<p>loading....</p>)}
    </div>
  )
}

export default WeatherApp
