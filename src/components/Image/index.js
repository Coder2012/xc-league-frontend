import React from 'react';
import Styles from './styles.module.css';

const Image = props => {
  const { time, location } = props;
  const day = 'UK4';
  const imgSrc = `http://rasp.mrsap.org/${day}/FCST/${location}.curr.${time}lst.d2.png`;
  return (
    <React.Fragment>
      {location && (
        <img className={Styles.responsive} src={imgSrc} alt="rasp sounding" />
      )}
    </React.Fragment>
  );
};

export default Image;
