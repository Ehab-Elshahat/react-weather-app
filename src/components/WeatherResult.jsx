import React from 'react'

function WeatherResult({ city, temp, humidity, desc, changeUnit, units }) {
  return (
    <div className="result">
      <h2>{city}</h2>

      <div className="temp-box">
        <p>Temperature: {Math.floor(temp)}</p>
        <button onClick={changeUnit}>change units</button>
      </div>
      <p>{desc}</p>
      <p>Humidity: {humidity}</p>
      <p>Wind Speed: 10</p>
    </div>
  );
}

export default WeatherResult;