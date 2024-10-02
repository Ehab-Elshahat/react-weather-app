/** @format */

import { useEffect, useRef, useState } from "react";
import "./App.css";
import WeatherResult from "./components/WeatherResult";
import axios from "axios";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_KEY = "909b1f5824dedf625ca0f44093c46cfc";

function App() {
  const [city, setCity] = useState("cairo ");
  const [data, setData] = useState(null);
  const [units, setUnits] = useState("metric"); //Or imperial




  const fetchApi = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
      )
      .then((response) => setData(response.data))
      .catch((error) => {
        if(error.response.status === 404) {
          alert("Pleas enter correct city name ")
     
        } else {
          console.log(error)
        }
      });
  }

  useEffect(() => {
    // Change Window Title
    document.title = "React Weather App";

    fetchApi()

  }, []);
  const handleInputChange = (e) => {
setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchApi();
    
  };

  const handleChangeUnit =()=>{
    setUnits( ()=>{
      if(units === 'metric') {
        return 'imperial'
      } else {
        return 'metric'
      }
    })
       fetchApi();
  }



  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the city "
            value={city}
            onChange={handleInputChange}
          />
          <button className="get-weather" type="submit">Get Weather</button>
        </form>
       {
        data ? (
           <WeatherResult
          city={data.name}
          temp={data.main.temp}
          desc={data.weather[0].description}
          humidity={data.main.humidity}
          windSpeed = {data.wind.speed}
          changeUnit = {handleChangeUnit}
          units = {units}
        />
        ) : (
          <p>Loading weather data</p>
        )
       }
      </div>
    </div>
  );
}

export default App;
