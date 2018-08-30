import React, { Component } from 'react';
import Flight from '../components/Flight';
import Controls from '../components/Controls';
import Limit from '../components/Limit';
import Calendar from '../components/Calendar';
import Search from '../components/Search';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            flights: [],
            dates: [4, 8, 12],
            pilots: ['test'],
            pilot: '',
            controls: {
                page: 1,
                limit: 10,
                responseType: 'full'
            },
            selectedDate: '',
            startDay: '',
            startMonth: '',
            startYear: '',
            finishDay: '',
            finishMonth: '',
            finishYear: ''
        }

        this.responseTypeHandler = this.responseTypeHandler.bind(this);
        this.limitHandler = this.limitHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.monthChangeHandler = this.monthChangeHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.calendarNavigationChangeHandler = this.calendarNavigationChangeHandler.bind(this);
    }

    componentDidMount() {
        this.monthChangeHandler(new Date())
        this.updateGetPilots();
    }

    responseTypeHandler(type) {
        console.log(type);
        this.setState({
            controls: { ...this.state.controls, responseType: type }
        }, () => {
            this.update();
        })
    }

    limitHandler(limit) {
        console.log(limit);
        this.setState({
            controls: { ...this.state.controls, limit: limit }
        }, () => {
            this.updateFlightsByDate();
        })
    }

    searchHandler(pilot) {
        console.log('search: ', pilot);
        this.setState({
            pilot: pilot
        }, () => {
            this.updateGetFlightByPilot();
        })
    }

    update() {
        this.getDates().then((response) => response.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    dates: this.getDatesCount(data.dates)
                }, () => console.log('setState dates'))
            })
    }

    updateGetFlightByPilot() {
        this.getPilotFlightData().then((response) => response.json())
            .then((data) => {
                // console.log(data)
                this.setState({ flights: data.flights });
        });
    }

    updateFlightsByDate() {
        this.getDate().then((response) => response.json())
            .then((data) => {
                // console.log(data)
                this.setState({ flights: data.flights });
        });
    }

    updateGetPilots() {
        this.getPilots().then((response) => response.json())
            .then((data) => {
                // console.log(data);
                this.setState({ pilots: data.pilots });
            })
    }

    getDatesCount(data) {
        let dataReduced = data.reduce((itemsArray, item, index) => {
            itemsArray[item] = {
                date: item, 
                count: ((itemsArray[item] && itemsArray[item].count) ? itemsArray[item].count : 0) + 1
            }
            return itemsArray;
        }, []);

        return Object.keys(dataReduced).map(item => dataReduced[item])
    }

    async getData () {
        return await fetch('http://localhost:3000/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                page: this.state.controls.page, 
                limit: this.state.controls.limit, 
                responseType: this.state.controls.responseType
            })
        })
    }

    async getPilotFlightData () {
        return await fetch('http://localhost:3000/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                pilot: this.state.pilot,
                page: this.state.controls.page, 
                limit: this.state.controls.limit, 
                responseType: this.state.controls.responseType
            })
        })
    }

    async getDates() {
        return await fetch('http://localhost:3000/flights/dates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                start: `${this.state.startYear}-${this.state.startMonth}-${this.state.startDay}`, 
                end: `${this.state.finishYear}-${this.state.finishMonth}-${this.state.finishDay}`
            })
        })
    }

    async getDate () {
        return await fetch('http://localhost:3000/flights/date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                date: this.state.selectedDate,
                page: this.state.controls.page, 
                limit: this.state.controls.limit, 
                responseType: this.state.controls.responseType
            })
        })
    }

    async getPilots () {
        return await fetch('http://localhost:3000/flights/pilots', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            // body: JSON.stringify({
            //     date: this.state.selectedDate,
            //     page: this.state.controls.page, 
            //     limit: this.state.controls.limit, 
            //     responseType: this.state.controls.responseType
            // })
        })
    }

    dateChangeHandler(date) {
        console.log('dateChangeHandler: ', date);
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
        console.log(newDate)
        this.setState({
            selectedDate: newDate
        }, () => this.updateFlightsByDate())
    }

    monthChangeHandler(date) {
        console.log('monthChangeHandler: ', date);
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        this.setState({
            startDay: firstDay,
            startMonth: date.getMonth() + 1,
            startYear: date.getFullYear(),
            finishDay: lastDay,
            finishMonth: date.getMonth() + 1,
            finishYear: date.getFullYear()
        }, () => this.update());
    }

    calendarNavigationChangeHandler({ activeStartDate }) {
        this.monthChangeHandler(activeStartDate)
    }

    render() { 
        return ( 
            <React.Fragment>
                <header>
                    <Search data={this.state.pilots} clickHandler={this.searchHandler} />
                    <Calendar 
                        dates={this.state.dates} 
                        dateChangeHandler={this.dateChangeHandler} 
                        monthChangeHandler={this.monthChangeHandler}
                        calendarNavigationHandler={this.calendarNavigationChangeHandler}/>
                    <Controls handler={this.responseTypeHandler}/>
                    <Limit handler={this.limitHandler}/>
                </header>
                    {this.state.flights.length}
                <section className="flights">
                    {this.state.flights.map(flight => {
                        return <Flight key={flight.identifier} data={flight}/>    
                    })}
                </section>
            </React.Fragment>
        );
    }
}
 
export default Flights;