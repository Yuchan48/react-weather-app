import React from "react";
import "./styles.css";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import DailyWeather from "./DailyWeather";

const MainScreen = ({ weatherInfo, cityName }) => {
  return (
    <div className="mainScreen">
      <CurrentWeather weatherInfo={weatherInfo} cityName={cityName} />

      <div>
        <HourlyWeather weatherInfo={weatherInfo} />
      </div>

      <div>
        <DailyWeather weatherInfo={weatherInfo} />
      </div>
    </div>
  );
};

export default MainScreen;
