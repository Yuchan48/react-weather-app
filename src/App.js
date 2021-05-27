import "./App.css";
import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import TabSecondary from "./components/panes";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [test, setTest] = useState([]);
 
  useEffect(() => {

    const fetchData = () => {
      //get the current location. If the location setting is off it default to Berlin
     /*
      getLocation = async () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
            })
      }*/
      
      new Promise(async(resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                console.error("Error detecting location.");
                setLat(52.5);
                setLong(13.4);
              }
            }
          );
        } else {
          console.log("no geolocation")
        }
      });

      getWeatherTest(lat, long);
      getHourWeather(lat, long);
    };
    fetchData();
  }, [lat, long]);

  
  const getWeatherTest = async (lat, long) => {

    const url1 = `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
    await fetch(url1)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        //console.log(result);
      })
  };
  const getHourWeather = async (lat, long) => {
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY_2}`;
    await fetch(url2)
      .then((res) => res.json())
      .then((result) => {
        setAllData(result);
      })
  };

  

  return (
    <div className="App">
      {(data.main && allData) ? (
        <div>
          <TabSecondary
            className="tabs"
            weatherData={data}
            weatherAllData={allData}
            
          />
        </div>
      ) : (
        <>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </>
      )}
    </div>
  );
}

export default App;
