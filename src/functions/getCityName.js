import axios from "axios";

export const getCityName = async (lat, long, locationInfo) => {
  const cityDataUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
  try {
    const locationData = await axios.get(cityDataUrl);

    return { ...locationInfo, cityName: locationData.data.city };
  } catch (error) {
    console.log("city data not available: ", error);

    return { ...locationInfo, cityName: "undefined" };
  }
};
