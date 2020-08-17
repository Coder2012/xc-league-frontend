import React from 'react';
import Styles from './styles.module.css';

export const Button = ({
  value,
  iconStyle = Styles['primary-button__icon'],
  clickHandler,
  icon,
  text,
  alt,
  className
}) => (
  <button
    data-value={value || null}
    onClick={clickHandler}
    className={className}
    type="button"
  >
    {icon && <img alt={alt} src={icon} className={iconStyle} />}
    {text}
  </button>
);
