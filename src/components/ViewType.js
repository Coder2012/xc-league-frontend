import React from 'react';
import classNames from 'classnames';
import { Button } from './Button/index';
import ButtonStyles from './Button/styles.module.css';
import Layout from '../Layout.module.css';

export const ViewType = ({ onClickHandler, selectedId }) => {
  return (
    <section
      className={classNames(Layout['flex-row'], Layout['vertical-centre'])}
    >
      <p className={Layout['h-spacing-right']}>Data:</p>
      <Button
        className={classNames(ButtonStyles['secondary-button'], {
          [ButtonStyles['secondary-button--selected']]: selectedId === 'full'
        })}
        clickHandler={() => onClickHandler('full')}
        iconStyle={ButtonStyles['secondary-button__icon']}
        text="Full"
      />
      <Button
        className={classNames(ButtonStyles['secondary-button'], {
          [ButtonStyles['secondary-button--selected']]: selectedId === 'minimal'
        })}
        clickHandler={() => onClickHandler('minimal')}
        iconStyle={ButtonStyles['secondary-button__icon']}
        text="Minimal"
      />
    </section>
  );
};
