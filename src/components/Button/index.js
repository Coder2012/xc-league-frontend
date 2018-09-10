import React from 'react';
import Styles from './styles.css';

const Button = (props) => {

    return (
        <button onClick={props.clickHandler} className={`${props.classes}`} type="button">
            {props.icon && <img src={props.icon} className={Styles['primary-button__icon']} />}
            {props.text}
        </button>
    )
}

export default Button;