import React from "react";
import "./styles.css";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import DailyWeather from "./DailyWeather";

export interface FetchedDataProps {
  weatherInfo?: any;
  cityName?: string
}

const MainScreen = ({ weatherInfo, cityName }: FetchedDataProps) => {
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
