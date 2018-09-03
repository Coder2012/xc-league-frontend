import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as flightActions from '../actions/flightActions';
import PropTypes from 'prop-types';
import Flight from '../components/Flight';
import Controls from '../components/Controls';
import Limit from '../components/Limit';
import Calendar from '../components/Calendar';
import Search from '../components/Search';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            controls: {
                page: 1,
                limit: 10,
                responseType: 'full'
            }
        }

        this.responseTypeHandler = this.responseTypeHandler.bind(this);
        this.limitHandler = this.limitHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.monthChangeHandler = this.monthChangeHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.calendarNavigationChangeHandler = this.calendarNavigationChangeHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
    }

    componentDidMount() {
        // this.monthChangeHandler(new Date())
        this.props.flightActions.fetchPilots();
        // this.props.flightActions.fetchFlights();
    }

    responseTypeHandler(type) {
        console.log(type);
        this.setState({
            controls: { ...this.state.controls, responseType: type }
        })
    }

    limitHandler(limit) {
        this.setState({
            controls: { ...this.state.controls, limit: limit }
        })
    }

    searchHandler(pilot) {
        this.props.flightActions.fetchFlightsByPilot({ pilot }, this.state.controls.limit, this.state.controls.page);
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
        let newDate = year + '-' + month + '-' + dt;
        console.log(newDate);

        this.props.flightActions.fetchFlightsByDate(newDate);
    }

    monthChangeHandler(date) {
        console.log('monthChangeHandler: ', date);
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

        this.props.flightActions.fetchFlightDates(startDate, endDate);
    }

    calendarNavigationChangeHandler({ activeStartDate }) {
        this.monthChangeHandler(activeStartDate)
    }

    paginationHandler(operator) {
        this.setState((previousState, currentProps) => {
            let controls = { ...previousState.controls };

            controls.page = (operator === 'increment') ? controls.page + 1 : Math.max(controls.page - 1, 0);
            return { ...previousState, controls};
        }, () => {
            
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                <header>
                    <Search data={this.props.flights.pilots} clickHandler={this.searchHandler} />
                    <Calendar 
                        dates={this.props.flights.dates} 
                        dateChangeHandler={this.dateChangeHandler} 
                        monthChangeHandler={this.monthChangeHandler}
                        calendarNavigationHandler={this.calendarNavigationChangeHandler}/>
                    <Controls handler={this.responseTypeHandler} paginationHandler={this.paginationHandler}/>
                    <Limit handler={this.limitHandler}/>
                </header>
                <p>Limit: {this.state.controls.limit}</p>
                <p>Total Flights: {this.props.flights.total}</p>
                <p>Page: {this.state.controls.page} of {this.props.flights.pages}</p>
                <section className="flights">
                    {this.props.flights.flights.map(flight => {
                        return <Flight key={flight.identifier} data={flight}/>    
                    })}
                </section>
            </React.Fragment>
        );
    }

    
}

const mapStateToProps = ({ flights }) => ({
    flights
})
    
function mapDispatchToProps(dispatch) {
    return {
        flightActions: bindActionCreators(flightActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flights);