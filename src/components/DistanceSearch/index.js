import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import ButtonStyles from '../Button/styles.module.css';
import Styles from './styles.module.css';
import Layout from '../../Layout.module.css';

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
          Layout['flex-row'],
          Layout['vertical-centre'],
          Layout['horizontal-centre'],
          Styles['distance']
        ])}
      >
        <legend>Score greater than</legend>
        {[150, 200, 250].map((limit, index) => {
          return (
            <Button
              dataTestId={`${limit}`}
              value={`${limit}`}
              key={index}
              className={classNames([
                ButtonStyles['secondary-button'],
                ButtonStyles['secondary-button--circle'],
                selectedId === limit
                  ? ButtonStyles['secondary-button--selected']
                  : ''
              ])}
              clickHandler={() => clickHandler(parseInt(`${limit}`), index)}
            />
          );
        })}
      </div>
    </form>
  );
};
