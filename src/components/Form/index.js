import React, { Component } from 'react';
import { timeData, dayData, locationData } from '../../data/rasp';
import Select from '../Select';
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
    console.log(name);
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
            <Select
              value={this.state.time}
              {...timeData()}
              onChange={this.selectHandler}
            />
          </dd>
          <dl />
          <dl>
            <dt>
              <label>Day</label>
            </dt>
            <dd>
              <Select
                value={this.state.day}
                {...dayData()}
                onChange={this.selectHandler}
              />
            </dd>
          </dl>
          <dt>
            <label>Location</label>
          </dt>
          <dd>
            <Select
              value={this.state.location}
              {...locationData()}
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
