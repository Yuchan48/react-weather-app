import axios from "axios";
import { LocationInfo } from "../App";

export const fetchIPAddress = async (): Promise<LocationInfo> => {
  try {
    const data = await axios.get("https://ipapi.co/json");
    const { latitude, longitude, city } = data.data;

    return { lat: latitude, long: longitude, cityName: city };
  } catch (error) {
    console.error("error fetching IP Address");
    return { lat: 52.5, long: 13.4, cityName: "Berlin" };
  }
};
