import axios from "axios";
import axiosRetry from "axios-retry";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Dimmer, Loader } from "semantic-ui-react";
import TabSecondary from "./components/panes";

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [locationError, setLocationError] = useState(false);

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
  }, [lat, long]);

  //console.log("weatherinfo", weatherInfo);
  const fetchWeatherData = async (lat, long) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    if (typeof lat === "number" && typeof long === "number") {
      try {
        const weatherData = await axios.get(weatherURL);
        setWeatherInfo(weatherData.data);
      } catch (error) {
        console.log("fail to fetch weather data:", error);
      }
    } else {
      console.log("location unavailable");
    }
  };

  return (
    <div className="App">
      {typeof weatherInfo.current !== "undefined" ? (
        <div>
          <TabSecondary
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
