import axios from "axios";

export const fetchIPAddress = async () => {
  try {
    const data = await axios.get("https://ipapi.co/json");
    const { latitude, longitude, city } = data.data;

    return { lat: latitude, long: longitude, cityName: city };
  } catch (error) {
    console.error("error fetching IP Address");

    return { lat: 52.5, long: 13.4, cityName: "Berlin" };
  }
};
