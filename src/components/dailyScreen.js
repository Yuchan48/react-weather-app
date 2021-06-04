import React from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

function DailyScreen({ weatherInfo }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    arrows: false,
    slidesToShow: 7,
    responsive: [
        {
          breakpoint: 1400,
          settings: {
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 3
          }
        },
        {
            breakpoint: 1100,
            settings: {
              arrows: true,
              slidesToShow: 4,
              slidesToScroll: 3
            }
          },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        }
      ]
  };

  const getDate = (date) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(date);
    return days[d.getDay()];
  };

  const dailyInfo = (item) => {
    const imageSrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    return (
      <div className="daily_items">
        <h4>{`${getDate(item.dt * 1000)}`}</h4>
        <div className="daily_row">
          <img src={imageSrc} alt="weather icon" />
          <div>
              <p>max &nbsp;{`${Math.round(item.temp.max)}`}&deg;C</p>
              <p>min &nbsp; {`${Math.round(item.temp.min)}`}&deg;C</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="daily_screen">
      <h3>Daily Forecast</h3>
      <Slider {...settings}>
      {weatherInfo.daily.map((item) => {
          return dailyInfo(item);
        })}
      </Slider>
    </div>
  );
}

export default DailyScreen;
