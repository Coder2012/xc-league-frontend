import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import Button from '../Button/index';
import Form from '../Form';
import * as searchActions from '../../actions/searchActions';
import { isSmall } from '../../helpers/viewport';
import UserSVG from '../../assets/user-icon.svg';
import CalendarSVG from '../../assets/calendar-icon.svg';
import LogoSVG from '../../assets/xc-league-logo.svg';
import SpinnerSVG from '../../assets/oval.svg';
import Styles from './styles.module.css';
import ButtonStyles from '../Button/styles.module.css';
import Layout from '../../Layout.module.css';

const Header = props => {
  const [isActive, setIsActive] = useState(false);
  const [pilotText, setPilotText] = useState('Search by pilot name');
  const [calendarText, setCalendarText] = useState('Search by flight data');
  const [distanceText, setDistanceText] = useState('Search by flight score');

  useEffect(() => {
    if (isSmall()) {
      setPilotText('Pilot');
      setCalendarText('Date');
      setDistanceText('Score');
    }
  }, [pilotText, calendarText, distanceText]);

  const pilotButtonHandler = () => {
    setIsActive(true);
    props.dispatch(searchActions.setSearchType('pilot'));
    sendActions();
    sendAnalytics('Search by pilot');
  };

  const dateButtonHandler = () => {
    setIsActive(true);
    props.dispatch(searchActions.setSearchType('date'));
    sendActions();
    sendAnalytics('Search by date');
  };

  const distanceButtonHandler = () => {
    setIsActive(true);
    props.dispatch(searchActions.setSearchType('distance'));
    sendActions();
    sendAnalytics('Search by distance');
  };

  const sendActions = () => {
    props.dispatch(searchActions.clearError());
    props.dispatch(searchActions.resetFlights());
    props.dispatch(searchActions.hideRaspForm(true));
  };

  const sendAnalytics = text => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Button Click',
      label: text
    });
  };

  let headerActive = isActive ? Styles['header--active'] : '';

  return (
    <header
      className={[Styles.header, headerActive, Layout['flex-column']].join(' ')}
    >
      <section
        className={[Layout['text-centre'], Layout['horizontal-centre']].join(
          ' '
        )}
      >
        <img alt="" className={Styles['header__logo']} src={LogoSVG} />
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
            clickHandler={distanceButtonHandler}
            icon={CalendarSVG}
            text={distanceText}
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
      {!props.hideForm && <Form />}
    </header>
  );
  // }
};

const mapStateToProps = ({ search, results }) => ({
  searchType: search.searchType,
  hideForm: search.hideForm,
  isFetching: results.isFetching
});

export default connect(mapStateToProps)(Header);
