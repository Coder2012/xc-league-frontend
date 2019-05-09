import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../Button/index';
import Form from '../Form';
import * as searchActions from '../../actions/searchActions';
import * as flightActions from '../../actions/flightActions';
import * as types from '../../actions/actionTypes';
import { isSmall } from '../../helpers/viewport';
import UserSVG from '../../assets/user-icon.svg';
import CalendarSVG from '../../assets/calendar-icon.svg';
import LogoSVG from '../../assets/xc-league-logo.svg';
import SpinnerSVG from '../../assets/oval.svg';
import Styles from './styles.module.css';
import ButtonStyles from '../Button/styles.module.css';
import Layout from '../../Layout.module.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      pilotText: 'Search by pilot name',
      calendarText: 'Search by flight date',
      distanceText: 'Search by flight score'
    };

    this.pilotButtonHandler = this.pilotButtonHandler.bind(this);
    this.dateButtonHandler = this.dateButtonHandler.bind(this);
    this.distanceButtonHandler = this.distanceButtonHandler.bind(this);
  }

  componentDidMount() {
    if (isSmall()) {
      this.setState({
        pilotText: 'Pilot',
        calendarText: 'Date',
        distanceText: 'Score'
      });
    }
  }

  pilotButtonHandler() {
    this.setActive();
    this.props.dispatch(searchActions.setSearchType('pilot'));
    this.sendActions();
  }
  
  dateButtonHandler() {
    this.setActive();
    this.props.dispatch(searchActions.setSearchType('date'));
    this.sendActions();
  }
  
  distanceButtonHandler() {
    this.setActive();
    this.props.dispatch(searchActions.setSearchType('distance'));
    this.sendActions();
  }

  sendActions() {
    this.props.dispatch(searchActions.clearError());
    this.props.dispatch(searchActions.resetFlights());
    this.props.dispatch(searchActions.hideRaspForm(true));
  }

  setActive() {
    this.setState({ isActive: true });
  }

  render() {
    let headerActive = this.state.isActive ? Styles['header--active'] : '';
    return (
      <header
        className={[Styles.header, headerActive, Layout['flex-column']].join(
          ' '
        )}
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
                this.props.searchType === 'pilot'
                  ? ButtonStyles['primary-button--selected']
                  : ''
              ].join(' ')}
              clickHandler={this.pilotButtonHandler}
              icon={UserSVG}
              text={this.state.pilotText}
            />
            <Button
              classes={[
                ButtonStyles['primary-button'],
                this.props.searchType === 'date'
                  ? ButtonStyles['primary-button--selected']
                  : ''
              ].join(' ')}
              clickHandler={this.dateButtonHandler}
              icon={CalendarSVG}
              text={this.state.calendarText}
            />
            <Button
              classes={[
                ButtonStyles['primary-button'],
                this.props.searchType === 'distance'
                  ? ButtonStyles['primary-button--selected']
                  : ''
              ].join(' ')}
              clickHandler={this.distanceButtonHandler}
              icon={CalendarSVG}
              text={this.state.distanceText}
            />
            <p>
              {this.props.isFetching && (
                <img
                  className={Styles['header__spinner']}
                  src={SpinnerSVG}
                  alt="loading..."
                />
              )}
            </p>
          </div>
        </section>
        {!this.props.hideForm && <Form />}
      </header>
    );
  }
}

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
  mapStateToProps
  // mapDispatchToProps
)(Header);
