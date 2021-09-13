import React from "react";
import Slider from "react-slick";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

const HourlyWeather = ({ weatherInfo }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const getHour = (hour) => new Date(hour).getHours();

  const getHourly = (item, i) => {
    const imageSrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    return (
      <div className="slider_item" key={i}>
        <p>{`${getHour(item.dt * 1000)}:00`}</p>
        <img src={imageSrc} alt="weather icon" />
        <h3>{`${Math.round(item.temp)}`}&deg;C</h3>
      </div>
    );
  };

  return (
    <div className="hourly_screen">
      <h3 className="hourly_title">Hourly Forecast</h3>
      <Slider {...settings}>
        {weatherInfo.hourly.slice(0, 24).map((item, i) => {
          return getHourly(item, i);
        })}
      </Slider>
    </div>
  );
};
export default HourlyWeather;
