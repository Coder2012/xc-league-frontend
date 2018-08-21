import React from 'react';

const Flight = ({ data }) => {
    return (
        <React.Fragment>
            <ul>
            <li>{data.identifier}</li>
            <li>{data.pilot}</li>
            <li>{data.title}</li>
            <li>{data.club}</li>
            <li>{data.glider}</li>
            <li>{data.date}</li>
            <li>{data.start}</li>
            <li>{data.finish}</li>
            <li>{data.duration}</li>
            <li>{data.takeoff}</li>
            <li>{data.landing}</li>
            <li>{data.multiplier}</li>
            <li>{data.score}</li>
            <li>{data.maxHeight}</li>
            <li>{data.lowHeight}</li>
            <li>{data.takeoffHeight}</li>
            <li>{data.maxClimb}</li>
            <li>{data.minClimb}</li>
            <li>{data.maxSpeed}</li>
            <li>{data.avgSpeedCourse}</li>
            </ul>
        </React.Fragment>
    );
}

export default Flight;