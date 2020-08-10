import React, { useState } from 'react';
import ErrorMessage from '../../components/Error';
import Flight from '../../components/Flight';

import Layout from '../../Layout.module.css';
import Styles from './styles.module.css';
import AppStyles from '../../App.module.css';
import Button from '../../components/Button';
import ButtonStyles from '../../components/Button/styles.module.css';

import ExcelSVG from '../../assets/excel.svg';

export const Flights = ({ searchType, results, message }) => {
  return (
    <>
      {results?.flights.length > 0 && (
        <main className={Layout.gutters}>
          <section
            className={[
              Layout['flex-row'],
              Layout['flex-mobile-column'],
              Layout['horizontal-centre'],
              AppStyles['controls']
            ].join(' ')}
          ></section>
          <section className={Styles.flights}>
            {results?.flights.map(flight => {
              return (
                <Flight
                  key={flight.identifier}
                  data={flight}
                  display={'full'}
                />
              );
            })}
          </section>
        </main>
      )}
    </>
  );
};
