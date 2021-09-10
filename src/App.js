import axios from "axios";
import axiosRetry from "axios-retry";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Dimmer, Loader } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getCityName } from "./functions/getCityName";
import { fetchIPAddress } from "./functions/fetchIPAddress";
import { backGroundImage } from "./functions/bgImage";

//screen
import MainScreen from "./components/mainScreen";

import { clearSky } from "./image/images";

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

function App() {
  const [locationInfo, setLocationInfo] = useState({
    lat: 0,
    long: 0,
    cityName: "",
  });
  const { lat, long, cityName } = locationInfo;
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [backImg, setBackImg] = useState(clearSky);

  useEffect(() => {
    const getData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocationInfo(
              getCityName(position.coords.latitude, position.coords.longitude)
            );
          },
          (error) => {
            setLocationInfo(fetchIPAddress());
          }
        );
      } else {
        console.log("geolocation not available");
        setLocationInfo(fetchIPAddress());
      }
      fetchWeatherData(lat, long);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  const fetchWeatherData = async (lat, long) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    if (typeof lat === "number" && typeof long === "number") {
      try {
        const weatherData = await axios.get(weatherURL);
        setWeatherInfo(weatherData.data);
        setBackImg(backGroundImage(weatherData));
      } catch (error) {
        console.log("fail to fetch weather data:", error);
      }
    } else {
      console.log("location unavailable");
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
