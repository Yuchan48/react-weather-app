import axios from "axios";
import axiosRetry from "axios-retry";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Dimmer, Loader } from "semantic-ui-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//screen
import MainScreen from "./components/mainScreen";

import{ clearSky, clearNight, clouds, cloudsNight, mist, mistNight, rain, rainNight, snow, snowNight, thunder, thunderNight,} from "./image/images"

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

function App() {
  const [locationInfo, setLocationInfo] = useState({ lat: 0, long: 0, cityName: "",});
  const { lat, long, cityName } = locationInfo;
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const [backImg, setBackImg] = useState([]);

  const fetchIPAddress = async () => {
    try {
      const data = await axios.get("https://ipapi.co/json");
      const { latitude, longitude, city } = data.data;
      setLocationInfo({ lat: latitude, long: longitude, cityName: city });
    } catch (error) {
      console.error("error fetching IP Address");
      setLocationInfo({ lat: 52.5, long: 13.4, cityName: "Berlin" });
      setLocationError(true);
    }
  };

  const getCityName = async (lat, long) => {
    const cityDataUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
    try {
      const locationData = await axios.get(cityDataUrl);
      setLocationInfo({ ...locationInfo, cityName: locationData.data.city });
    } catch (error) {
      console.log("city data not available: ", error);
      setLocationInfo({
        ...locationInfo,
        cityName: "undefined",
      });
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocationInfo({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });

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
