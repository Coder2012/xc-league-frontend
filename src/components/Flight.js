import React from 'react';

const Flight = ({ data }) => {
    return (
        <section className="flight">
            <header className="flight__header">
                <h2 className="flight__pilot no-margin">{data.pilot}</h2>
                <p className="flight__title no-margin">{data.title}</p>
                <p className="flight__club no-margin-bottom">{data.club}</p>
                <p className="no-margin-top">{data.glider}</p>
            </header>
            <div className="flight__body">
                <div className="flex-row">
                    <p className="no-margin-bottom">Start: <span className="emphasize">{data.start}</span></p>
                    <p className="no-margin-bottom">Finish: <span className="emphasize">{data.finish}</span></p>
                </div>
                <p>Duration: <span className="emphasize">{data.duration}</span></p>
                <p>Takeoff: <span className="emphasize">{data.takeoff}</span></p>
                <p>Landing: <span className="emphasize">{data.landing}</span></p>
            </div>
            <footer className="flight__footer">
                <p>Score: <span className="emphasize">{data.score}</span> {data.multiplier && <span>({data.multiplier})</span>}</p>
                <p>Max Height: <span className="emphasize">{data.maxHeight}</span></p>
                <p>Low Height: <span className="emphasize">{data.lowHeight}</span></p>
                <p>Takeoff Height: <span className="emphasize">{data.takeoffHeight}</span></p>
                <p>{data.maxClimb}</p>
                <p>{data.minClimb}</p>
                <p>{data.maxSpeed}</p>
                <p>{data.avgSpeedCourse}</p>
            </footer>
        </section>
    );
}

export default Flight;