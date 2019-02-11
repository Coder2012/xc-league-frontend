import React from "react";
import Styles from "./styles.module.css";

const Button = props => {
  let data = props.value || null;
  let iconStyle = props.iconStyle || Styles["primary-button__icon"];

  return (
    <button
      data-value={data}
      onClick={props.clickHandler}
      className={`${props.classes}`}
      type="button"
    >
      {props.icon && <img alt={props.alt} src={props.icon} className={iconStyle} />}
      {props.text}
    </button>
  );
};

export default Button;
