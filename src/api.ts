import { DarkSkyApiClient } from "dark-sky-client-ts";

const darksky = new DarkSkyApiClient(process.env.REACT_APP_API_ADDRESS as string, {
    latitude: 37.8267,
    longitude: -122.423
});

export const callWeather = async () => {
    const weatherData = await darksky.getWeather();
    return weatherData;
};