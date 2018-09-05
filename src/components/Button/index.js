import React from 'react';
import Styles from './styles.css';

const Button = (props) => {
    return (
        <button className={Styles['primary-button']} type="button">
            <img src={props.icon} className={Styles['primary-button__icon']} />
            {props.text}
        </button>
    )
}

export default Button;