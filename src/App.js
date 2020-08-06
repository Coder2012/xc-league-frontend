import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import { Header } from './components/Header';
import { Pilot } from './views/Pilot';
import { Date } from './views/Date';
import { Score } from './views/Score';
import Flights from './views/Flights/index';
import Styles from './App.module.css';
import ReactGA from 'react-ga';

import { pilotsService } from './services/pilots';
import { Weather } from './components/Weather';

export const App = () => {
  useEffect(() => {
    Sentry.init({
      dsn: 'https://c59644d1c05645f0b81702d9dd38af59@sentry.io/1545393'
    });

    ReactGA.initialize('UA-143319467-1');
    ReactGA.pageview('/app');

    pilotsService.getPilots();
  }, []);

  return (
    <div className={Styles.App}>
      <Header />
      <Switch>
        <Route path="/pilot">
          <Pilot />
        </Route>
        <Route path="/date">
          <Date />
        </Route>
        <Route path="/score">
          <Score />
        </Route>
        <Route path="/">
          <Weather />
        </Route>
      </Switch>
    </div>
  );
};
