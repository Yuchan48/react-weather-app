import "./App.css";
import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import TabSecondary from "./components/panes";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (
          position.coords.latitude === "undefined" ||
          position.coords.longitude === "undefined"
        ) {
          setLat(52.522);
          setLong(13.4133);
        } else {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        }
      });
      getWeatherTest(lat, long);
      getHourWeather(lat, long);
    };
    fetchData();
  }, [lat, long]);

  const getWeatherTest = async (lat, long) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        //console.log(result);
      });
  };
  const getHourWeather = async (lat, long) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setAllData(result);
      });
  };

  return (
    <div className="App">
      {(typeof data.main != "undefined") & (typeof allData != "undefined") ? (
        <div>
          <TabSecondary
            className="tabs"
            weatherData={data}
            weatherAllData={allData}
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
