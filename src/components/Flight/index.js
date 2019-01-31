import React from 'react';
import Styles from './styles.module.css';
import Layout from '../../Layout.module.css';
import App from '../../App.module.css';

const Flight = ({ data, display }) => {
    const date = new Date(data.date);

    return (
        <section className={Styles.flight}>
            <header className={Styles.flight__header}>
                <p className={Layout['no-margin']}>{date.toDateString()}</p>
                <h2 className={Styles.flight__pilot}>{data.pilot}</h2>
                <p className={Styles.flight__title}>{data.title}</p>
                <p className={Styles.flight__club}>{data.club}</p>
                <p className={Layout['no-margin-top']}>{data.glider}</p>
                <p>Score: <span className={App.emphasize}>{data.score}</span> {data.multiplier && <span>({data.multiplier})</span>}</p>
            </header>
            { display === 'full' && 
            <div className={Styles.flight__body}>
                <div className={Layout['flex-row-sb']}>
                    <p className={Layout['no-margin-bottom']}>Start: <span className={App.emphasize}>{data.start}</span></p>
                    <p className={Layout['no-margin-bottom']}>Finish: <span className={App.emphasize}>{data.finish}</span></p>
                </div>
                <p>Duration: <span className={App.emphasize}>{data.duration}</span></p>
                <p>Takeoff: <span className={App.emphasize}>{data.takeoff}</span></p>
                <p>Landing: <span className={App.emphasize}>{data.landing}</span></p>
            </div>
            }
            { display === 'full' && 
            <footer className={Styles.flight__footer}>
                <p>Max Height: <span className={App.emphasize}>{data.maxHeight}ft</span></p>
                <p>Low Height: <span className={App.emphasize}>{data.lowHeight}ft</span></p>
                <p>Takeoff Height: <span className={App.emphasize}>{data.takeoffHeight}ft</span></p>
                <div className={Layout['flex-row-sb']}>
                    <p className={Layout['no-margin-bottom']}>Max Climb: <span className={App.emphasize}>{data.maxClimb}ms</span></p>
                    <p className={Layout['no-margin-bottom']}>Min Climb: <span className={App.emphasize}>{data.minClimb}ms</span></p>
                </div>
                <div className={Layout['flex-row-sb']}>
                    <p>Max Speed: <span className={App.emphasize}>{data.maxSpeed}kmh</span></p>
                    <p>Average Speed: <span className={App.emphasize}>{data.avgSpeedCourse}kmh</span></p>
                </div>
            </footer>
            }
        </section>
    );
}

export default Flight;