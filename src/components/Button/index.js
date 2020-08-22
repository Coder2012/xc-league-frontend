import React from 'react';
import classNames from 'classnames';
import Styles from './styles.module.scss';

export const Button = ({
  secondary,
  alternate,
  circle,
  circleIcon,
  icon,
  value,
  dataTestId,
  clickHandler,
  link,
  alt,
  active,
  disabled,
  children
}) => (
  <button
    data-testid={dataTestId}
    data-value={value || null}
    onClick={clickHandler}
    type="button"
    disabled={disabled}
    className={classNames({
      [Styles['primary-button']]: !secondary,
      [Styles['secondary-button']]: secondary,
      [Styles['secondary-button--alternate']]: secondary && alternate,
      [Styles['secondary-button--circle']]: circle,
      [Styles['secondary-button--circle-alternate']]: circleIcon,
      [Styles['primary-button--selected']]: !secondary && active,
      [Styles['secondary-button--selected']]: secondary && active,
      [Styles['primary-button--link']]: link
    })}
  >
    {icon && (
      <img
        alt={alt}
        src={icon}
        className={classNames({
          [Styles['primary-button__icon']]: icon,
          [Styles['secondary-button__icon']]: circleIcon
        })}
      />
    )}
    {children}
  </button>
);
