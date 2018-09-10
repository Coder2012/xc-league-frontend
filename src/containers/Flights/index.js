import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as flightActions from '../../actions/flightActions';
import PropTypes from 'prop-types';
import Flight from '../../components/Flight';
import Controls from '../../components/Controls';
import Limit from '../../components/Limit';
import Calendar from '../../components/Calendar/index';
import Search from '../../components/Search/index';

import Layout from '../../Layout.css';
import Styles from './styles.css';

class Flights extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            selectedDate: '',
            pilot: '',
            controls: {
                page: 1,
                limit: 10,
                responseType: 'full'
            }
        }
        this.state = this.initialState;

        this.limitHandler = this.limitHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.monthChangeHandler = this.monthChangeHandler.bind(this);
        this.responseTypeHandler = this.responseTypeHandler.bind(this);
        this.calendarNavChangeHandler = this.calendarNavChangeHandler.bind(this);
    }

    resetState(callback) {
        this.setState(this.initialState, () => {
            callback();
        });
    }

    componentDidMount() {
        // this.monthChangeHandler(new Date())
        this.props.flightActions.fetchPilots();
    }

    responseTypeHandler(type) {
        this.setState({
            controls: { ...this.state.controls, responseType: type }
        }, () => {
            this.updateSearch();
        })
    }

    limitHandler(limit) {
        this.setState({
            controls: { ...this.state.controls, limit: limit }
        }, () => {
            this.updateSearch();
        })
    }

    searchHandler(pilot) {
        this.resetState(() => {
            this.setState({
                pilot: pilot
            }, () => {
                this.fetchFlightsByPilot();
            })
        });
    }

    dateChangeHandler(date) {
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        this.resetState(() => {
            this.setState({
                selectedDate: year + '-' + month + '-' + dt
            }, () => {
                this.fetchFlightsByDate();
            });
        })

    }

    monthChangeHandler(date) {
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let startMonth = date.getMonth() + 1;
        let finishMonth = date.getMonth() + 1;
        let startYear = date.getFullYear();
        let finishYear = date.getFullYear();

        if(firstDay < 10) {
            firstDay = '0' + firstDay;
        }

        if(startMonth < 10) {
            startMonth = '0' + startMonth;
        }

        if(finishMonth < 10) {
            finishMonth = '0' + finishMonth;
        }

        let startDate = `${startYear}-${startMonth}-${firstDay}`;
        let endDate = `${finishYear}-${finishMonth}-${lastDay}`;

        this.resetState(() => {
            this.props.flightActions.fetchFlightDates(startDate, endDate);
        });
    }

    calendarNavChangeHandler({ activeStartDate }) {
        this.monthChangeHandler(activeStartDate)
    }

    paginationHandler(operator) {
        this.setState((previousState, currentProps) => {
            let controls = { ...previousState.controls };

            controls.page = (operator === 'increment') ? Math.min(controls.page + 1, this.props.flights.pages) : Math.max(controls.page - 1, 1);
            return { ...previousState, controls};
        }, () => {
            this.updateSearch();
        });
    }

    updateSearch() {
        (this.props.searchType === 'pilot')? this.fetchFlightsByPilot() : this.fetchFlightsByDate();
    }
    
    fetchFlightsByDate() {
        this.props.flightActions.fetchFlightsByDate(this.state.selectedDate, this.state.controls.limit, this.state.controls.page);
    }

    fetchFlightsByPilot() {
        this.props.flightActions.fetchFlightsByPilot(this.state.pilot, this.state.controls.limit, this.state.controls.page);
    }

    render() { 
        return ( 
            <React.Fragment>
                <section className={this.props.searchType !== '' ? Layout['fixed-spacer'] : ''}>
                    { this.props.searchType === 'pilot' ? <Search data={this.props.flights.pilots} clickHandler={this.searchHandler} /> : null }
                    { this.props.searchType === 'date' ? <Calendar 
                            dates={this.props.flights.dates} 
                            dateChangeHandler={this.dateChangeHandler} 
                            monthChangeHandler={this.monthChangeHandler}
                            calendarNavigationHandler={this.calendarNavChangeHandler}/> : null
                    }
                </section>
                {this.props.flights.flights.length > 0 && 
                <main>
                    { this.props.searchType === 'pilot' && this.state.pilot !== '' && <p>{this.props.flights.total} Flights by {this.state.pilot}</p> }
                    
                    <section className={Layout['flex-row']}>
                        <Limit handler={this.limitHandler}/>
                        <Controls handler={this.responseTypeHandler} paginationHandler={this.paginationHandler}/>
                    </section>
                    <p>Page: {this.state.controls.page}/{this.props.flights.pages}</p>
                    <section className={Styles.flights}>
                        {this.props.flights.flights.map(flight => {
                            return <Flight key={flight.identifier} data={flight}/>    
                        })}
                    </section>
                </main>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ flights, search }) => ({
    flights,
    searchType: search.searchType
})
    
function mapDispatchToProps(dispatch) {
    return {
        flightActions: bindActionCreators(flightActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flights);