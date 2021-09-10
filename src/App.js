import axios from "axios";
import axiosRetry from "axios-retry";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Dimmer, Loader } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {getCityName} from "./functions/getCityName"
import { fetchIPAddress } from "./functions/fetchIPAddress";
//screen
import MainScreen from "./components/mainScreen";

import{ clearSky, clearNight, clouds, cloudsNight, mist, mistNight, rain, rainNight, snow, snowNight, thunder, thunderNight,} from "./image/images"

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

function App() {
  const [locationInfo, setLocationInfo] = useState({ lat: 0, long: 0, cityName: "",});
  const { lat, long, cityName } = locationInfo;
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [backImg, setBackImg] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocationInfo({
              lat: position.coords.latitude,
              long: position.coords.longitude,
              cityName: ""
            });
            setLocationInfo(getCityName(lat, long, locationInfo))
           
          },
          (error) => {
            setLocationInfo(fetchIPAddress())
          }
        );
      } else {
        console.log("geolocation not available");
        setLocationInfo(fetchIPAddress());
      }
      fetchWeatherData(lat, long);
    };
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  const fetchWeatherData = async (lat, long) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    if (typeof lat === "number" && typeof long === "number") {
      try {
        const weatherData = await axios.get(weatherURL);
        setWeatherInfo(weatherData.data);
        backGroundImage(weatherData);
      } catch (error) {
        console.log("fail to fetch weather data:", error);
      }
    } else {
      console.log("location unavailable");
    }
  };

  const backGroundImage = (weatherData) => {
    const mainWeather = weatherData.data.current.weather[0].icon;
    const bgObj = { "02d": clouds, "03d": clouds, "04d": clouds, "02n": clearNight, "03n": cloudsNight, "04n": cloudsNight, "09d": rain, "10d": rain, "09n": rainNight, "10n": rainNight, "50d": mist, "50n": mistNight, "13d": snow, "13n": snowNight, "11d": thunder, "11n": thunderNight, "01n": clearNight, "01d": clearSky,};

    setBackImg(bgObj[mainWeather] || clearSky);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backImg})` }}>
      {typeof weatherInfo.current !== "undefined" ? (
        <div>
          <MainScreen
            className="tabs"
            weatherInfo={weatherInfo}
            cityName={cityName}
          />
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

export default App;
