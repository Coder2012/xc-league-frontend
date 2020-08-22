import React from 'react';
import classNames from 'classnames';
import { Button } from '../Button/index';
import Layout from '../../layout.module.scss';

export const ViewType = ({ onClickHandler, selectedId }) => {
  return (
    <section
      className={classNames(Layout.flexRow, Layout.verticalCentre)}
    >
      <p className={Layout.hSpacingRight}>Data:</p>
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
