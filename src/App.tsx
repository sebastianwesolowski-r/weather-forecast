import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';

import ComfortaaFont from './assets/fonts/Comfortaa-VariableFont_wght.ttf';

import LandingPage from './pages/landing-page';
import WeatherPage from './pages/weather-page';

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

interface UserLocationObject {
  latitude: Number;
  longitude: Number;
};

export type SetLocationFunction = (geoUserLocation: UserLocationObject) => void;

const App = () => {

  const [userLocation, changeUserLocation] = useState({});

  const setUserLocation: SetLocationFunction = (geoUserLocation) => changeUserLocation(geoUserLocation);

  console.log(userLocation);

  return (
    <>
      <GlobalStyle />
      <HeaderLink href="https://sw-weather.netlify.app">weather app</HeaderLink>
      <Switch>
        <Route exact path="/" render={() => <LandingPage setUserLocation={setUserLocation}/>} />
        {
          // użyj redirecta na /weather => if userLocation jest na miejscu
        }
        <Route exact path="/weather" component={WeatherPage}/>
      </Switch>
      <Footer>
        <a href="https://darksky.net">Powered by DarkSky</a>
      </Footer>
    </>
  )
}

export default App;
