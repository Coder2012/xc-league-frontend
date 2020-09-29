import React, { useState } from 'react';
import { timeData, dayData, locationData } from '../../data/rasp';
import Select from '../Select';
import Image from '../Image/index';
import { getWeekDays, getDayString } from '../../helpers/date';
import Layout from '../../layout.module.scss';
import Styles from './styles.module.scss';

export const Weather = () => {
  const date = new Date();
  const today = getDayString(date, 'en-GB');

  const [state, setState] = useState({
    time: '1200',
    location: '',
    weekdays: getWeekDays(date, 'en-GB'),
    today,
    day: today
  });

  const selectHandler = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form className={Styles.form}>
      <dl>
        <dt>
          <label>Time</label>
        </dt>
        <dd>
          <Select value={state.time} {...timeData()} onChange={selectHandler} />
        </dd>
        <dl />
        <dl>
          <dt>
            <label>Day</label>
          </dt>
          <dd>
            <Select value={state.day} {...dayData()} onChange={selectHandler} />
          </dd>
        </dl>
        <dt>
          <label>Location</label>
        </dt>
        <dd>
          <Select
            value={state.location}
            {...locationData()}
            onChange={selectHandler}
          />
        </dd>
      </dl>
      <p>
        RASP soundings courtesy of{' '}
        <a href="http://rasp.stratus.org.uk/app/soundings/">
          rasp.stratus.org.uk
        </a>
      </p>
      <section className={Layout.vSpacing}>
        <Image {...state} />
      </section>
    </form>
  );
};
