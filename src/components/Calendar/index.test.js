import React from 'react';
import { render, screen } from '@testing-library/react';

import { getDatesCount } from '../../helpers/date';
import { Calendar } from './index';

import '@testing-library/jest-dom';

const dates = [
  '2020-08-10T00:00:00.000Z',
  '2020-08-04T00:00:00.000Z',
  '2020-08-02T00:00:00.000Z',
  '2020-08-09T00:00:00.000Z',
  '2020-08-09T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-07T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-06T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-03T00:00:00.000Z',
  '2020-08-01T00:00:00.000Z',
  '2020-08-01T00:00:00.000Z',
  '2020-08-01T00:00:00.000Z',
  '2020-08-01T00:00:00.000Z',
  '2020-08-17T00:00:00.000Z',
  '2020-08-16T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-15T00:00:00.000Z',
  '2020-08-14T00:00:00.000Z',
  '2020-08-14T00:00:00.000Z',
  '2020-08-14T00:00:00.000Z',
  '2020-08-08T00:00:00.000Z'
];

const dateChangeHandler = jest.fn();

describe('Calendar', () => {
  test('Should highlight dates with results', async () => {
    render(
      <Calendar
        dates={getDatesCount(dates)}
        activeStartDate={new Date(2020, 7, 1)}
        dateChangeHandler={dateChangeHandler}
      />
    );

    // screen.debug();
    const [,eight] = await screen.findAllByText('8');
    const [,fourteen] = await screen.findAllByText('14');

    expect(eight).toHaveClass('flight-count-medium');
    expect(fourteen).toHaveClass('flight-count-low');
  });
});