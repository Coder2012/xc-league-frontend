import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as flightActions from '../../actions/flightActions';
import cloneDeep from 'clone-deep';
import Flight from '../../components/Flight';
import Pagination from '../../components/Pagination';
import Limit from '../../components/Limit';
import Calendar from '../../components/Calendar/index';
import PilotSearch from '../../components/PilotSearch/index';

import Layout from '../../Layout.css';
import Styles from './styles.css';
import AppStyles from '../../App.css';
import ViewType from '../../components/ViewType';
import DistanceSearch from '../../components/DistanceSearch';
import Button from '../../components/Button';
import ButtonStyles from '../../components/Button/styles.css';

import ExcelSVG from '../../assets/excel.svg';

class Flights extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            selectedDate: '',
            pilot: '',
            distance: 0,
            distanceId: null,
            controls: {
                page: 1,
                limit: 12,
                limitId: 0,
                responseType: 'full'
            }
        }
        this.state = this.getInitialState();

        this.limitHandler = this.limitHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.distanceSearchHandler = this.distanceSearchHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.monthChangeHandler = this.monthChangeHandler.bind(this);
        this.responseTypeHandler = this.responseTypeHandler.bind(this);
        this.calendarNavChangeHandler = this.calendarNavChangeHandler.bind(this);
        this.fetchFlightsExportHandler = this.fetchFlightsExportHandler.bind(this);
    }

    getInitialState() {
        return cloneDeep(this.initialState);
    }

    resetState(callback) {
        this.setState(this.initialState, () => {
            callback();
        });
    }

    componentDidMount() {
        this.monthChangeHandler(new Date())
        this.props.flightActions.fetchPilots();
    }

    responseTypeHandler(type) {
        this.setState({
            controls: { ...this.state.controls, responseType: type }
        }, () => {
            this.updateSearch();
        })
    }

    limitHandler(limit, index) {
        this.setState({
            controls: { ...this.state.controls, limit: limit, limitId: index, page: 1 }
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

    distanceSearchHandler(value, index) {
        this.resetState(() => {
            this.setState({ 
                distance: value,
                distanceId: index
            }, () => {
                this.fetchFlightsByDistance();
            })
        })
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
        this.props.flightActions.resetFlightDates();
        this.monthChangeHandler(activeStartDate)
    }

    paginationHandler(operator) {
        this.setState((previousState, currentProps) => {
            let controls = { ...previousState.controls };
            controls.page = (operator === 'increment') ? Math.min(controls.page + 1, this.props.results.pages) : Math.max(controls.page - 1, 1);

            if(previousState.controls.page === controls.page) {
                controls.skipUpdate = true;
            }else{
                controls.skipUpdate = false;
            }
            
            return { ...previousState, controls};
        }, () => {
            if(!this.state.controls.skipUpdate) {
                this.updateSearch();
            }
        });
    }

    updateSearch() {
        switch (this.props.searchType) {
            case 'pilot':
                 this.fetchFlightsByPilot();
                 break;

            case 'date':
                this.fetchFlightsByDate();
                break;

            case 'distance':
                this.fetchFlightsByDistance();
                break;
        }
    }
    
    fetchFlightsByDate() {
        this.props.flightActions.fetchFlightsByDate(this.state.selectedDate, this.state.controls.limit, this.state.controls.page);
    }

    fetchFlightsByPilot() {
        this.props.flightActions.fetchFlightsByPilot(this.state.pilot, this.state.controls.limit, this.state.controls.page);
    }

    fetchFlightsByDistance() {
        this.props.flightActions.fetchFlightsByDistance(this.state.distance, this.state.controls.limit, this.state.controls.page);
    }

    fetchFlightsExportHandler() {
        this.props.flightActions.fetchFlightsExport(this.props.results.flights);
    }

    render() { 
        return ( 
            <React.Fragment>
                <section className={[Layout.gutters, this.props.searchType !== '' ? Layout['fixed-spacer'] : ''].join(' ')}>
                    { this.props.searchType === 'pilot' && <PilotSearch data={this.props.results.pilots} clickHandler={this.searchHandler} /> }
                    { this.props.searchType === 'date' && <Calendar 
                            dates={this.props.results.dates} 
                            dateChangeHandler={this.dateChangeHandler} 
                            monthChangeHandler={this.monthChangeHandler}
                            calendarNavigationHandler={this.calendarNavChangeHandler}/> }
                    { this.props.searchType === 'distance' && <DistanceSearch selectedId={this.state.distanceId} clickHandler={this.distanceSearchHandler} />}
                    
                </section>

                {this.props.results.flights.length > 0 && 
                <main className={Layout.gutters}>
                    { this.props.searchType === 'pilot' && this.state.pilot !== '' && 
                        <p className={AppStyles.subtitle}>{this.props.results.total} Flights by {this.state.pilot}</p> }
                    { this.props.searchType === 'date' && this.state.selectedDate !== '' && 
                        <p className={AppStyles.subtitle}>{this.props.results.total} Flight{this.props.results.total > 1 ? 's' : ''} on  {new Date(this.state.selectedDate).toDateString()}</p> }
                    { this.props.searchType === 'distance' && this.state.distance !== 0 && 
                        <p className={AppStyles.subtitle}>{this.props.results.total} Flight{this.props.results.total > 1 ? 's' : ''} scoring over {this.state.distance}</p> }

                    <section className={[Layout['flex-row'], Layout['flex-mobile-column'], Layout['horizontal-centre'], AppStyles['controls']].join(' ')}>
                        <Limit selectedId={this.state.controls.limitId} handler={this.limitHandler}/>
                        <Pagination page={this.state.controls.page} pages={this.props.results.pages} paginationHandler={this.paginationHandler}/>
                        <ViewType handler={this.responseTypeHandler} />
                    </section>
                    <Button classes={[ButtonStyles['primary-button'], ButtonStyles['primary-button--narrow'], this.props.searchType === 'pilot' ? ButtonStyles['primary-button--selected'] : ''].join(' ')} 
                        clickHandler={this.fetchFlightsExportHandler} 
                        icon={ExcelSVG} 
                        text={'Download'} />
                    <section className={Styles.flights}>
                        {this.props.results.flights.map(flight => {
                            return <Flight key={flight.identifier} data={flight} display={this.state.controls.responseType}/>    
                        })}
                    </section>
                    <Pagination page={this.state.controls.page} pages={this.props.results.pages} paginationHandler={this.paginationHandler}/>
                    <p></p>
                </main>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ results, search }) => ({
    results,
    searchType: search.searchType
})
    
function mapDispatchToProps(dispatch) {
    return {
        flightActions: bindActionCreators(flightActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flights);