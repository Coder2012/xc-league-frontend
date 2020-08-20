import React from 'react';
import classNames from 'classnames';
import { Button } from './Button';
import ButtonStyles from '../components/Button/styles.module.css';
import Layout from '../Layout.module.css';
import LeftArrowSVG from '../assets/left-arrow.svg';
import RightArrowSVG from '../assets/right-arrow.svg';

const Controls = ({
  page,
  pages,
  onClickHandler
}) => {
  return (
    <React.Fragment>
      <section
        className={classNames(
          Layout['flex-row'],
          Layout['vertical-centre'],
          Layout['horizontal-centre'],
          Layout['h-space-around']
        )}
      >
        <Button
          disabled={page === 1}
          dataTestId={'prev'}
          className={classNames(
            ButtonStyles['secondary-button'],
            ButtonStyles['secondary-button--circle'],
            ButtonStyles['secondary-button--circle-alternate']
          )}
          clickHandler={() => onClickHandler('decrement')}
          iconStyle={ButtonStyles['secondary-button__icon']}
          icon={LeftArrowSVG}
        />
        <p>
          Page {page}/{pages}
        </p>
        <Button
          disabled={page === pages}
          dataTestId={'next'}
          className={classNames(
            ButtonStyles['secondary-button'],
            ButtonStyles['secondary-button--circle'],
            ButtonStyles['secondary-button--circle-alternate']
          )}
          clickHandler={() => onClickHandler('increment')}
          iconStyle={ButtonStyles['secondary-button__icon']}
          icon={RightArrowSVG}
        />
      </section>
    </React.Fragment>
  );
};

export default Controls;
