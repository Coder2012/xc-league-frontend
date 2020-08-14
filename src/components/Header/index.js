import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '../Button/index';
import { isSmall } from '../../helpers/viewport';
import UserSVG from '../../assets/user-icon.svg';
import CalendarSVG from '../../assets/calendar-icon.svg';
import LogoSVG from '../../assets/xc-league-logo.svg';
import SpinnerSVG from '../../assets/oval.svg';
import Styles from './styles.module.css';
import ButtonStyles from '../Button/styles.module.css';
import Layout from '../../Layout.module.css';

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

  let headerActive = location.pathname === '/' ? '' : Styles['header--active'];

  return (
    <header
      className={[Styles.header, headerActive, Layout['flex-column']].join(' ')}
    >
      <section
        className={[Layout['text-centre'], Layout['horizontal-centre']].join(
          ' '
        )}
      >
        <img alt="" className={Styles['header__logo']} src={LogoSVG} onClick={() => history.push('/')} />
        <div className={[Layout['v-spacing'], Styles['flex-row']].join(' ')}>
          <Button
            classes={[
              ButtonStyles['primary-button'],
              props.searchType === 'pilot'
                ? ButtonStyles['primary-button--selected']
                : ''
            ].join(' ')}
            clickHandler={pilotButtonHandler}
            icon={UserSVG}
            text={pilotText}
          />
          <Button
            classes={[
              ButtonStyles['primary-button'],
              props.searchType === 'date'
                ? ButtonStyles['primary-button--selected']
                : ''
            ].join(' ')}
            clickHandler={dateButtonHandler}
            icon={CalendarSVG}
            text={calendarText}
          />
          <Button
            classes={[
              ButtonStyles['primary-button'],
              props.searchType === 'distance'
                ? ButtonStyles['primary-button--selected']
                : ''
            ].join(' ')}
            clickHandler={scoreButtonHandler}
            icon={CalendarSVG}
            text={scoreText}
          />
          <p>
            {props.isFetching && (
              <img
                className={Styles['header__spinner']}
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
