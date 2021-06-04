import React from "react";
import "./styles.css";
import CurrentScreen from "./currentScreen";
import HourlyScreen from "./hourlyScreen";
import DailyScreen from "./dailyScreen";

const MainScreen = ({ weatherInfo, cityName }) => {
  return (
    <div className="mainScreen">
      <CurrentScreen weatherInfo={weatherInfo} cityName={cityName} />

      <div>
        <HourlyScreen weatherInfo={weatherInfo} />
      </div>

      <div>
        <DailyScreen weatherInfo={weatherInfo} />
      </div>
    </div>
  );
};

export default MainScreen;
