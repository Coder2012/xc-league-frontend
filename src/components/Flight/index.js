import React from 'react';

import Styles from './styles.module.scss';
import Layout from '../../layout.module.scss';
import AppStyles from '../../app.module.scss';
import { Button } from '../../components/Button';
import LinkSVG from '../../assets/external-link-symbol.svg';

const Flight = ({ data, display }) => {
  const date = new Date(data.date);

  const externalLinkHandler = () => {
    window.open(data.link, '_blank');
  };

  return (
    <section className={Styles.flight}>
      <header className={Styles.flight__header}>
        <p className={Layout.noMargin}>{date.toDateString()}</p>
        <h2 className={Styles.flight__pilot}>{data.pilot}</h2>
        <p className={Styles.flight__title}>{data.title}</p>
        <p className={Styles.flight__club}>{data.club}</p>
        <p className={Layout.noMarginTop}>{data.glider}</p>
        <p>
          Score: <span className={AppStyles.emphasize}>{data.score}</span>{' '}
          {data.multiplier && <span>({data.multiplier})</span>}
        </p>
        <Button
          link
          clickHandler={externalLinkHandler}
          icon={LinkSVG}
        />
      </header>
      {display === 'full' && (
        <div className={Styles.flight__body}>
          <div className={Layout.flexRowSb}>
            <p className={Layout.noMarginBottom}>
              Start: <span className={AppStyles.emphasize}>{data.start}</span>
            </p>
            <p className={Layout.noMarginBottom}>
              Finish: <span className={AppStyles.emphasize}>{data.finish}</span>
            </p>
          </div>
          <p>
            Duration: <span className={AppStyles.emphasize}>{data.duration}</span>
          </p>
          <p>
            Takeoff: <span className={AppStyles.emphasize}>{data.takeoff}</span>
          </p>
          <p>
            Landing: <span className={AppStyles.emphasize}>{data.landing}</span>
          </p>
        </div>
      )}
      {display === 'full' && (
        <footer className={Styles.flight__footer}>
          <p>
            Max Height:{' '}
            <span className={AppStyles.emphasize}>{data.maxHeight}ft</span>
          </p>
          <p>
            Low Height:{' '}
            <span className={AppStyles.emphasize}>{data.lowHeight}ft</span>
          </p>
          <p>
            Takeoff Height:{' '}
            <span className={AppStyles.emphasize}>{data.takeoffHeight}ft</span>
          </p>
          <div className={Layout.flexRowSb}>
            <p className={Layout.noMarginBottom}>
              Max Climb:{' '}
              <span className={AppStyles.emphasize}>{data.maxClimb}ms</span>
            </p>
            <p className={Layout.noMarginBottom}>
              Min Climb:{' '}
              <span className={AppStyles.emphasize}>{data.minClimb}ms</span>
            </p>
          </div>
          <div className={Layout.flexRowSb}>
            <p>
              Max Speed:{' '}
              <span className={AppStyles.emphasize}>{data.maxSpeed}kmh</span>
            </p>
            <p>
              Average Speed:{' '}
              <span className={AppStyles.emphasize}>{data.avgSpeedCourse}kmh</span>
            </p>
          </div>
        </footer>
      )}
    </section>
  );
};

export default Flight;
