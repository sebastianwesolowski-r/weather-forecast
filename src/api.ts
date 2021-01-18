import axios from 'axios';

import {CoordinatesObject} from './types';

const api = axios.create({
    baseURL: "http://127.0.0.1:9010"
});

export const callForecast = (coordinates: CoordinatesObject) => api.get('/weather', {
    params: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    }
});

export const callGeocode = async (address: string) => {
    const geocode = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${process.env.REACT_APP_GEOCODE_KEY}&limit=1`);
    const responseData = {
        city: geocode.data.features[0].context[1].text,
        country: geocode.data.features[0].context[3].text,
        latitude: geocode.data.features[0].geometry.coordinates[1],
        longitude: geocode.data.features[0].geometry.coordinates[0]
    };
    return responseData;
};

export const callReverseGeocode = async (coordinates: CoordinatesObject) => {
    const reverseGeocode = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.longitude},${coordinates.latitude}.json?access_token=${process.env.REACT_APP_GEOCODE_KEY}&limit=1`);
    const responseData = {
        city: reverseGeocode.data.features[0].context[1].text,
        country: reverseGeocode.data.features[0].context[3].text,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    };
    return responseData;
};