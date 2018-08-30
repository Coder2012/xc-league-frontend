import React from 'react';

const Flight = ({ data }) => {
    const date = new Date(data.date);

    return (
        <section className="flight">
            <header className="flight__header">
                <p className="no-margin">{date.toDateString()}</p>
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
                <p>Max Height: <span className="emphasize">{data.maxHeight}ft</span></p>
                <p>Low Height: <span className="emphasize">{data.lowHeight}ft</span></p>
                <p>Takeoff Height: <span className="emphasize">{data.takeoffHeight}ft</span></p>
                <div className="flex-row">
                    <p className="no-margin-bottom">Max Climb: <span className="emphasize">{data.maxClimb}ms</span></p>
                    <p className="no-margin-bottom">Min Climb: <span className="emphasize">{data.minClimb}ms</span></p>
                </div>
                <div className="flex-row">
                    <p>Max Speed: <span className="emphasize">{data.maxSpeed}kmh</span></p>
                    <p>Average Speed: <span className="emphasize">{data.avgSpeedCourse}kmh</span></p>
                </div>
            </footer>
        </section>
    );
}

export default Flight;