import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button/index';
import Layout from '../../layout.module.scss';

export const Limit = ({ onClickHandler }) => {
  const [selectedId, setSelectedId] = useState(12);

  const clickHandler = (id, index) => {
    setSelectedId(id);
    onClickHandler(id, index);
  };

  return (
    <section
      className={classNames(Layout.flexRow, Layout.verticalCentre)}
    >
      <p>Flights per page:</p>
      <div>
        {[12, 24, 48].map((limit, index) => {
          return (
            <Button
              value={`${limit}`}
              key={limit}
              secondary
              circle
              active={selectedId === parseInt(limit)}
              clickHandler={() => clickHandler(limit, index)}
            />
          );
        })}
      </div>
    </section>
  );
};
