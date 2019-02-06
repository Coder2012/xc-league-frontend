import React, { Component } from 'react';
import Time from '../Select/Time';
import Day from '../Select/Day';
import Location from '../Select/Location';
import Image from '../Image/index';
import { getWeekDays, getDayString } from '../../helpers/date';
import Layout from '../../Layout.module.css';
import Styles from './styles.module.css';

class Form extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const today = getDayString(date, 'gb-en');
    const weekdays = getWeekDays(date, 'gb-en');
    console.log('today', today)

    this.state = {
      time: '1200',
      location: '',
      weekdays,
      today,
      day: today
    };

    this.selectHandler = this.selectHandler.bind(this);
  }

  selectHandler(event) {
    const name = event.target.name;
    console.log(name)
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <form className={Styles.form}>
        <dl>
          <dt>
            <label>Time</label>
          </dt>
          <dd>
            <Time value={this.state.time} onChange={this.selectHandler} />
          </dd>
          <dl />
          <dl>
            <dt>
              <label>Day</label>
            </dt>
            <dd>
              <Day value={this.state.day} today={this.state.today} days={this.state.weekdays} onChange={this.selectHandler} />
            </dd>
          </dl>
          <dt>
            <label>Location</label>
          </dt>
          <dd>
            <Location
              value={this.state.location}
              onChange={this.selectHandler}
            />
          </dd>
        </dl>
        <p>
          RASP soundings courtesy of{' '}
          <a href="http://rasp.stratus.org.uk/app/soundings/">
            rasp.stratus.org.uk
          </a>
        </p>
        <section className={Layout['v-spacing']}>
          <Image {...this.state} />
        </section>
      </form>
    );
  }
}

export default Form;
