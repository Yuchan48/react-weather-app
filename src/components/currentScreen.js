import React from "react";
import moment from "moment";

function currentScreen({ weatherInfo, cityName }) {
  const imageSrc = `https://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`;

  return (
    <div className="current_container">
      <p className="city_name">{cityName}</p>

      <div className="current_row">
        <img className="current_icon" src={imageSrc} alt="weather icon"></img>
        <p className="current_temp">
          {Math.round(weatherInfo.current.temp)} &deg;C
        </p>
      </div>

      <p className="current_desc">
        {weatherInfo.current.weather[0].description}
      </p>
      <p className="current_time">
        {moment().format("dddd")}, <span>{moment().format("LL")}</span>
      </p>
    </div>
  );
}

export default currentScreen;
