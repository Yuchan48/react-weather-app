import axios from "axios";
import axiosRetry from "axios-retry";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Dimmer, Loader } from "semantic-ui-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//screen
import MainScreen from "./components/mainScreen";

//image
import clearSky from "./image/clear.jpg";
import clearNight from "./image/clear-night.jpg";
import clouds from "./image/clouds.jpg";
import cloudsNight from "./image/clouds-night.jpg";
import mist from "./image/mist.jpg";
import mistNight from "./image/mist-night.jpg";
import rain from "./image/rain-day.jpg";
import rainNight from "./image/rain-night.jpg";
import snow from "./image/snow.jpg";
import snowNight from "./image/snow-night.jpg";
import thunder from "./image/thunder-day.jpg";
import thunderNight from "./image/thunder.jpg";

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const [backImg, setBackImg] = useState([]);

  const fetchIPAddress = async () => {
    try {
      const data = await axios.get("https://ipapi.co/json");
      if (data) {
        const { latitude, longitude, city } = data.data;
        setLat(latitude);
        setLong(longitude);
        setCityName(city);
      } else {
        setLat(52.5);
        setLong(13.4);
        setCityName("Berlin");
        setLocationError(true);
      }
    } catch (error) {
      console.error("error fetching IP Address");
      setLat(52.5);
      setLong(13.4);
      setCityName("Berlin");
      setLocationError(true);
    }
  };

  const getCityName = async (lat, long) => {
    const cityDataUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
    try {
      const locationData = await axios.get(cityDataUrl);
      setCityName(locationData.data.city);
    } catch (error) {
      console.log("city data not available: ", error);
      setCityName("undefined");
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            getCityName(lat, long);
          },
          (error) => {
            fetchIPAddress();
          }
        );
      } else {
        console.log("geolocation not available");
        fetchIPAddress();
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
    const mainWeather = weatherData.data.current.weather[0].main;

    switch (mainWeather) {
      case "02d" || "03d" || "04d":
        setBackImg(clouds);
        break;
      case "02n" || "03n" || "04n":
        setBackImg(cloudsNight);
        break;
      case "09d" || "10d":
        setBackImg(rain);
        break;
      case "09n" || "10n":
        setBackImg(rainNight);
        break;
      case "50d":
        setBackImg(mist);
        break;
      case "50n":
        setBackImg(mistNight);
        break;
      case "13d":
        setBackImg(snow);
        break;
      case "13n":
        setBackImg(snowNight);
        break;
      case "11d":
        setBackImg(thunder);
        break;
      case "11n":
        setBackImg(thunderNight);
        break;
      case "01n":
        setBackImg(clearNight);
        break;
      default:
        setBackImg(clearSky);
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backImg})` }}>
      {typeof weatherInfo.current !== "undefined" ? (
        <div>
          <MainScreen
            className="tabs"
            weatherInfo={weatherInfo}
            cityName={cityName}
            locationError={locationError}
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
