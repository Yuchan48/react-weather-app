import axios from "axios";

export const getCityName = async (lat, long) => {
  const cityDataUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
  try {
    const locationData = await axios.get(cityDataUrl);

    return { lat: lat, long: long, cityName: locationData.data.city };
  } catch (error) {
    console.log("city data not available: ", error);

    return { lat: lat, long: long, cityName: "undefined" };
  }
};
