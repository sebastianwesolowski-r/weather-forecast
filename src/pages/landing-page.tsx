import React from 'react';
import styled from 'styled-components';

import {ReactComponent as CloudBig} from '../assets/icons/cloud-big.svg';
import {ReactComponent as CloudSmall} from '../assets/icons/cloud-small.svg';

import {SetLocationFunction} from '../types';

const LandingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Clouds = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    svg {
        margin: 0 15px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    bottom: 60px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 40px;
    h1 {
        font-weight: normal;
        margin: 0;
    }
    span, a {
        color: ${(props: any) => props.theme.customOrange};
    }
    p {
        width: 340px;
        font-size: 1rem;
        line-height: 20px;
        margin-top: 15px;
    }
`;

const StartButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 48px;
    font-size: 1rem;
    background-color: ${(props: any) => props.theme.customOrange};
    margin-bottom: 10px;
    outline: none;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    transition-duration: 120ms;
    &:hover {
        opacity: 0.8;
    }
`;

const Annotation = styled.p`
    width: 205px;
    font-size: 0.8rem;
    text-align: center;
`;

interface LandingPageProps {
    setUserLocation: SetLocationFunction
}

const LandingPage = ({setUserLocation}: LandingPageProps) => {

    const localisationSuccess = (position: any) => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
    }

    const locationFailure = () => {
        setUserLocation({latitude: undefined, longitude: undefined});
    };

    const geoFindUser = () => {
        navigator.geolocation.getCurrentPosition(localisationSuccess, locationFailure);
    }

    return (
        <LandingPageContainer>
            <Clouds>
                <CloudBig />
                <CloudSmall />
            </Clouds>
            <Wrapper>
                <Title>
                    <h1>Check the <span>weather</span> in your city</h1>
                    <p>Keep track of forecast in your city using <a href="https://sw-weather.netlify.app">weather app</a></p>
                </Title>
                <StartButton onClick={geoFindUser}>Get Started</StartButton>
                <Annotation>
                    *  You will be asked for location permission
                </Annotation>
            </Wrapper>
        </LandingPageContainer>
    );
}

export default LandingPage;