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
import MainScreen from "./components/MainScreen";

import { clearSky } from "./image/images";

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export interface LocationInfo {
  lat?: number,
  long?: number,
  cityName?: string
}

const App: React.FC = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    lat: 0,
    long: 0,
    cityName: "",
  });
  const { lat, long, cityName } = locationInfo;
  const [weatherInfo, setWeatherInfo] = useState<any>([]);
  const [backImg, setBackImg] = useState(clearSky);

  useEffect(() => {
    const getData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
          setLocationInfo(
            await getCityName(position.coords.latitude, position.coords.longitude)
          );
        });
      } else {
        console.log("geolocation not available");
        setLocationInfo(await fetchIPAddress());
      }
      fetchWeatherData(lat, long);
    };
    getData();
  }, [lat, long]);

  const fetchWeatherData = async (lat: number | undefined, long: number | undefined): Promise<void> => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      const weatherData = await axios.get(weatherURL);
      setWeatherInfo(weatherData.data);
      setBackImg(backGroundImage(weatherData));
    } catch (error) {
      console.log("fail to fetch weather data:", error);
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backImg})` }}>
      {typeof weatherInfo.current !== "undefined" ? (
        <div>
          <MainScreen
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
