import React from 'react';

import Flight from '../../components/Flight';

import Layout from '../../Layout.module.css';
import Styles from './styles.module.css';

// import ExcelSVG from '../../assets/excel.svg';

export const Flights = ({  results }) => {
  return (
    <>
      {results?.flights.length > 0 && (
        <main className={Layout.gutters}>
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