import React, { useState } from 'react';
import Button from '../Button';
import ButtonStyles from '../Button/styles.module.css';
import Styles from './styles.module.css';
import Layout from '../../Layout.module.css';

export const DistanceSearch = ({handleClick}) => {
  const [selectedId, setSelectedId] = useState();

  const clickHandler = id => {
    setSelectedId(id);
    handleClick(id);
  }

    return (
      <form>
        <div
          className={[
            Layout['flex-row'],
            Layout['vertical-centre'],
            Layout['horizontal-centre'],
            Styles['distance']
          ].join(' ')}
        >
          <legend>Score greater than</legend>
          {[150, 200, 250].map((limit, index) => {
            return (
              <Button
                value={`${limit}`}
                key={index}
                classes={[
                  ButtonStyles['secondary-button'],
                  ButtonStyles['secondary-button--circle'],
                  selectedId === limit
                    ? ButtonStyles['secondary-button--selected']
                    : ''
                ].join(' ')}
                clickHandler={() =>
                  clickHandler(parseInt(`${limit}`), index)
                }
              />
            );
          })}
        </div>
      </form>
    );
}

