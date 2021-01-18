import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {callForecast, callGeocode, callReverseGeocode} from '../api';

import {UserLocationObject, CoordinatesObject} from '../types';

interface WeatherPageProps {
    userLocation: UserLocationObject
};

const WeatherPage = ({userLocation}: WeatherPageProps) => {

    const [currentForecast, setCurrentForecast] = useState({});
    const [recentSearches, setRecentSearch] = useState([]);

    const getGeocode = async (location: string) => {
        const geocodeInfo = await callGeocode(location);
        setCurrentForecast(geocodeInfo);
    };

    const getReverseGeocode = async (coordinates: CoordinatesObject) => {
        const reverseGeocodeInfo = await callReverseGeocode(coordinates);
        setCurrentForecast(reverseGeocodeInfo);
    };

    const getForecast = async (coordinates: CoordinatesObject) => {
        const forecastData = await callForecast(coordinates);
        setCurrentForecast({
            ...currentForecast,
            icon: forecastData.data.body.currently.icon,
            dayOfWeek: forecastData.data.headers.date.substring(0, 11),
            wind: forecastData.data.body.currently.windSpeed,
            humidity: forecastData.data.body.currently.humidity,
            precipProbability: forecastData.data.body.currently.precipProbability,
            alert: forecastData.data.body.alerts[0],
            summary: forecastData.data.body.daily.summary
        });
    };

    useEffect(() => {
        const {latitude, longitude} = userLocation;
        if(latitude && longitude) {
            getReverseGeocode({latitude, longitude});
            getForecast({latitude, longitude});
        }
    }, [userLocation]);
    console.log(currentForecast);
    return (
        <>
        </>
    );
};

export default WeatherPage;