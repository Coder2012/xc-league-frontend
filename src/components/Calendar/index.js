import React, { Component } from "react";
import deepEqual from "deep-equal";
import ReactCalendar from "react-calendar";
import "../../react-calendar/styles.css";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.tileContent = this.tileContent.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (deepEqual(this.props.dates, nextProps.dates)) {
      console.log("dont render");
      return false;
    }
    this.tileContent = this.tileContent.bind(this);
    console.log("need to render");
    return true;
  }

  tileContent({ date, view }) {
    let flightCount = this.dateExists(date.getMonth(), date.getDate());
    if (flightCount) {
      return view === "month" && flightCount ? (
        <span className={`calendar-flights ${this.getCountClass(flightCount)}`}>
          {date.getDate()}
        </span>
      ) : null;
    }
    return null;
  }

  dateExists(calendarMonth, calendarDate) {
    let datesCount = 0;

    this.props.dates.some(({ date, count }) => {
      let flightDate = new Date(date);
      if (
        calendarMonth === flightDate.getMonth() &&
        calendarDate === flightDate.getDate()
      ) {
        datesCount = count;
      }
      return datesCount;
    });

    return datesCount;
  }

  getCountClass(count) {
    if (count >= 10 && count <= 50) {
      return "flight-count-medium";
    } else if (count > 50) {
      return "flight-count-high";
    }
    return "flight-count-low";
  }

  render() {
    return (
      <React.Fragment>
        <ReactCalendar
          tileClassName="calendar-item"
          tileContent={this.tileContent}
          minDate={new Date("2005-01-01")}
          maxDate={new Date()}
          onChange={this.props.dateChangeHandler}
          onClickMonth={this.props.monthChangeHandler}
          onActiveDateChange={this.props.calendarNavigationHandler}
        />
      </React.Fragment>
    );
  }
}

export default Calendar;
