import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import { Button } from '../Button/index';
import { isSmall } from '../../helpers/viewport';
import UserSVG from '../../assets/user-icon.svg';
import CalendarSVG from '../../assets/calendar-icon.svg';
import LogoSVG from '../../assets/xc-league-logo.svg';
import SpinnerSVG from '../../assets/oval.svg';
import Styles from './styles.module.scss';
import Layout from '../../layout.module.scss';

export const Header = props => {
  const history = useHistory();
  const location = useLocation();

  const [pilotText, setPilotText] = useState('Search by pilot name');
  const [calendarText, setCalendarText] = useState('Search by flight date');
  const [scoreText, setScoreText] = useState('Search by flight score');

  useEffect(() => {
    if (isSmall()) {
      setPilotText('Pilot');
      setCalendarText('Date');
      setScoreText('Score');
    }
  }, [pilotText, calendarText, scoreText]);

  const pilotButtonHandler = () => {
    history.push('/pilot');
    sendAnalytics('Search by pilot');
  };

  const dateButtonHandler = () => {
    history.push('/dates');
    sendAnalytics('Search by date');
  };

  const scoreButtonHandler = () => {
    history.push('/score');
    sendAnalytics('Search by score');
  };

  const sendAnalytics = text => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Button Click',
      label: text
    });
  };

  return (
    <header
      className={classNames(
        Styles.header,
        { [Styles['header--active']]: location.pathname !== '/' },
        Layout.flexColumn
      )}
    >
      <section
        className={classNames(
          Layout.textCentre,
          Layout.horizontalCentre
        )}
      >
        <img
          alt=""
          className={Styles.header__logo}
          src={LogoSVG}
          onClick={() => history.push('/')}
        />
        <div className={classNames(Layout.vSpacing, Styles.flexRow)}>
          <Button
            active={location.pathname.includes('pilot')}
            clickHandler={pilotButtonHandler}
            icon={UserSVG}
          >
            {pilotText}
          </Button>
          <Button
            active={location.pathname.includes('dates')}
            clickHandler={dateButtonHandler}
            icon={CalendarSVG}
          >
            {calendarText}
          </Button>
          <Button
            active={location.pathname.includes('score')}
            clickHandler={scoreButtonHandler}
            icon={CalendarSVG}
          >
            {scoreText}
          </Button>
          <p>
            {props.isFetching && (
              <img
                className={Styles.header__spinner}
                src={SpinnerSVG}
                alt="loading..."
              />
            )}
          </p>
        </div>
      </section>
    </header>
  );
};
