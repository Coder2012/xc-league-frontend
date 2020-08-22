import React, { useEffect } from 'react';
import classNames from 'classnames';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { pilotsService } from './services/pilots';

import { Header } from './components/Header';

import { Pilot } from './views/Pilot';
import { Dates } from './views/Dates';
import { Score } from './views/Score';

import Styles from './app.module.scss';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    Sentry.init({
      dsn: 'https://c59644d1c05645f0b81702d9dd38af59@sentry.io/1545393'
    });

    ReactGA.initialize('UA-143319467-1');
    ReactGA.pageview('/app');

    pilotsService.getPilots();
  }, []);

  return (
    <div
      className={classNames(Styles.app, {
        [Styles['app--ishome']]: location.pathname === '/'
      })}
    >
      <Header />
      <Switch>
        <Route path="/pilot">
          <Pilot />
        </Route>
        <Route path="/dates">
          <Dates />
        </Route>
        <Route path="/score">
          <Score />
        </Route>
      </Switch>
    </div>
  );
};
