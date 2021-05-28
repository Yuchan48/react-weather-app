import React from "react";
import moment from "moment";
import { Button } from "semantic-ui-react";

const refresh = () => {
  window.location.reload();
};

export default function firstPanel({ weatherInfo, cityName }) {
  const imageSrc = `http://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`;
  
  
  return (
    <div className="main">
      <div className="top">
        <p className="header">{cityName}</p>

        <Button
          className="button"
          inverted
          color="blue"
          circular
          icon="refresh"
          onClick={refresh}
          
        />
        
        
      </div>
      <div className="flex">
        <p className="day">
          {moment().format("dddd")}, <span>{moment().format("LL")}</span>
        </p>
        <div className="flex">
          <p className="description">{weatherInfo.current.weather[0].description}</p>
          <img className="weatherIcon" src={imageSrc} alt="weather icon"></img>
        </div>
      </div>

      <div className="flex">
        <p className="temp">Temprature: {weatherInfo.current.temp} &deg;C</p>
        <p className="temp">Humidity : {weatherInfo.current.humidity} &#37;</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">
          Sunrise:{" "}
          {new Date(weatherInfo.current.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="sunrise-sunset">
          Sunset:{" "}
          {new Date(weatherInfo.current.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
