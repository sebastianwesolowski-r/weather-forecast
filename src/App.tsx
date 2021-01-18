import React, {useState, useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';

import ComfortaaFont from './assets/fonts/Comfortaa-VariableFont_wght.ttf';

import LandingPage from './pages/landing-page';
import WeatherPage from './pages/weather-page';

import {UserLocationObject, SetLocationFunction} from './types';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Comfortaa;
    src: url(${ComfortaaFont});
  }
  * {
    box-sizing: border-box;
    font-family: Comfortaa;
    color: ${(props: any) => props.theme.customBlack};
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 16px;
  }
  body {
    background-color: #fff;
  }
  p {
    margin: 0;
  }
`

const HeaderLink = styled.a`
  position: absolute;
  top: 60px;
  left: 100px;
  font-size: 0.9rem;
`;

const Footer = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 20px;
  text-align: center;
  a {
    font-size: 0.8rem;
  }
`;

const App = ({history}:any) => {

  const [userLocation, changeUserLocation] = useState<UserLocationObject>({});

  const setUserLocation: SetLocationFunction = (geoUserLocation) => changeUserLocation(geoUserLocation);

  useEffect(() => {
    if(Object.keys(userLocation).length != 0) {
      history.push("/weather");
    }
  }, [userLocation]);

  return (
    <>
      <GlobalStyle />
      <HeaderLink href="https://sw-weather.netlify.app">weather app</HeaderLink>
      <Switch>
        <Route exact path="/" render={() => <LandingPage setUserLocation={setUserLocation}/>} />
        <Route exact path="/weather" render={() => <WeatherPage userLocation={userLocation} />}/>
      </Switch>
      <Footer>
        <a href="https://darksky.net">Powered by DarkSky</a>
      </Footer>
    </>
  )
}

export default withRouter(App);
