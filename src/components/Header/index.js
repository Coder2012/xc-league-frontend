import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../Button/index';
import Form from '../Form';
import * as searchActions from '../../actions/searchActions';
import * as flightActions from '../../actions/flightActions';
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
  });

  const pilotButtonHandler = () => {
    setIsActive(true);
    props.searchActions.setSearchType('pilot');
    props.flightActions.resetFlights();
    props.searchActions.hideRaspForm(true);
  };

  const dateButtonHandler = () => {
    setIsActive(true);
    props.searchActions.setSearchType('date');
    props.flightActions.resetFlights();
    props.searchActions.hideRaspForm(true);
  };

  const distanceButtonHandler = () => {
    setIsActive(true);
    props.searchActions.setSearchType('distance');
    props.flightActions.resetFlights();
    props.searchActions.hideRaspForm(true);
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

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    flightActions: bindActionCreators(flightActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
