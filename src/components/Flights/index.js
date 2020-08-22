import React from 'react';

import Flight from '../../components/Flight';

import Layout from '../../layout.module.scss';
import Styles from './styles.module.scss';

// import ExcelSVG from '../../assets/excel.svg';

export const Flights = ({ results, display }) => {
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
                  display={display}
                />
              );
            })}
          </section>
        </main>
      )}
    </>
  );
};
