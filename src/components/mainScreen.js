import React from "react";
//import { Tab } from "semantic-ui-react";
import "./styles.css";
import CurrentScreen from './currentScreen';
import HourlyScreen from './hourlyScreen';
import DailyScreen from './dailyScreen';

//import FirstPanel from "./firstPanel";
//import SecondPanel from "./secondPanel";
//import ThirdPanel from "./thirdPanel";

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
  )
};

export default MainScreen;
