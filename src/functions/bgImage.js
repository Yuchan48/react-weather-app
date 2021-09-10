import {
  clearSky,
  clearNight,
  clouds,
  cloudsNight,
  mist,
  mistNight,
  rain,
  rainNight,
  snow,
  snowNight,
  thunder,
  thunderNight,
} from "../image/images";

export const backGroundImage = (weatherData) => {
  const mainWeather = weatherData.data.current.weather[0].icon;
  const bgObj = {
    "02d": clouds,
    "03d": clouds,
    "04d": clouds,
    "02n": clearNight,
    "03n": cloudsNight,
    "04n": cloudsNight,
    "09d": rain,
    "10d": rain,
    "09n": rainNight,
    "10n": rainNight,
    "50d": mist,
    "50n": mistNight,
    "13d": snow,
    "13n": snowNight,
    "11d": thunder,
    "11n": thunderNight,
    "01n": clearNight,
    "01d": clearSky,
  };
  if (bgObj[mainWeather]) return bgObj[mainWeather];
  return clearSky;
};
