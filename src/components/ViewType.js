import React from 'react';
import classNames from 'classnames';
import { Button } from './Button/index';
import Layout from '../Layout.module.css';

export const ViewType = ({ onClickHandler, selectedId }) => {
  return (
    <section
      className={classNames(Layout['flex-row'], Layout['vertical-centre'])}
    >
      <p className={Layout['h-spacing-right']}>Data:</p>
      <Button
        secondary
        active={selectedId === 'full'}
        clickHandler={() => onClickHandler('full')}
      >
        Full
      </Button>
      <Button
        secondary
        active={selectedId === 'minimal'}
        clickHandler={() => onClickHandler('minimal')}
      >
        Minimal
      </Button>
    </section>
  );
};
