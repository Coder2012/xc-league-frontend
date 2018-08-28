import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';
import '../App.css';

class Calendar extends Component {
    constructor(props) {
        super(props);
        // this.state = { 
        //     dates: this.props.dates
        //  }

    }

    tileContent = ({ date, view }) => {
        return view === 'month' && this.dateExists(date.getMonth(), date.getDate()) ? <span className="calendar-flights"></span> : null;
    }
    
    dateExists(calendarMonth, calendarDate) {
        return this.props.dates.some(({ date }) => {
            let flightDate = new Date(date);
            return (calendarMonth === flightDate.getMonth() && calendarDate === flightDate.getDate())
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                length:{this.props.dates.length}
                <ReactCalendar tileClassName="calendar-item" tileContent={this.tileContent} onChange={this.props.dateChangeHandler} onClickMonth={this.props.monthChangeHandler} />
            </React.Fragment>
        );
    }
}
 
export default Calendar;