import React, { useState } from 'react';
import Button from '../components/Button/index';
import Styles from '../components/Button/styles.module.css';
import Layout from '../Layout.module.css';

export const Limit = ({ handler }) => {
  const [selectedId, setSelectedId] = useState(12);

  const clickHandler = (id, index) => {
    setSelectedId(id);
    handler(id, index);
  };

  return (
    <React.Fragment>
      <section
        className={[Layout['flex-row'], Layout['vertical-centre']].join(' ')}
      >
        <p>Flights per page:</p>
        <div>
          {[12, 24, 48].map((limit, index) => {
            return (
              <Button
                value={`${limit}`}
                key={limit}
                classes={[
                  Styles['secondary-button'],
                  Styles['secondary-button--circle'],
                  selectedId === parseInt(limit)
                    ? Styles['secondary-button--selected']
                    : ''
                ].join(' ')}
                clickHandler={() => clickHandler(`${limit}`, index)}
              />
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Limit;
