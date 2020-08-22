import React from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import Layout from '../../layout.module.scss';
import LeftArrowSVG from '../../assets/left-arrow.svg';
import RightArrowSVG from '../../assets/right-arrow.svg';

const Controls = ({
  page,
  pages,
  onClickHandler
}) => {
  return (
    <>
      <section
        className={classNames(
          Layout.flexRow,
          Layout.verticalCentre,
          Layout.horizontalCentre,
          Layout.hSpaceAround
        )}
      >
        <Button
          disabled={page === 1}
          dataTestId={'prev'}
          secondary
          circle
          circleIcon
          clickHandler={() => onClickHandler('decrement')}
          icon={LeftArrowSVG}
        />
        <p>
          Page {page}/{pages}
        </p>
        <Button
          disabled={page === pages}
          dataTestId={'next'}
          secondary
          circle
          circleIcon
          clickHandler={() => onClickHandler('increment')}
          icon={RightArrowSVG}
        />
      </section>
    </>
  );
};

export default Controls;
