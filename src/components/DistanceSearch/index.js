import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import Styles from './styles.module.scss';
import Layout from '../../layout.module.scss';

export const DistanceSearch = ({ handleClick }) => {
  const [selectedId, setSelectedId] = useState();

  const clickHandler = id => {
    setSelectedId(id);
    handleClick(id);
  };

  return (
    <form>
      <div
        className={classNames([
          Layout.flexRow,
          Layout.verticalCentre,
          Layout.horizontalCentre,
          Styles.distance
        ])}
      >
        <legend>Score greater than</legend>
        {[150, 200, 250].map((limit, index) => {
          return (
            <Button
              dataTestId={`${limit}`}
              value={`${limit}`}
              key={index}
              secondary
              circle
              active={selectedId === limit}
              clickHandler={() => clickHandler(parseInt(`${limit}`), index)}
            />
          );
        })}
      </div>
    </form>
  );
};
