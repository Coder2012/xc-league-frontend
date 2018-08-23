import React from 'react';

const Limit = ((props) => {
    return (
        <React.Fragment>
            <section>
                <button type="button" onClick={() => {props.handler(10)}}>10</button>
                <button type="button" onClick={() => {props.handler(25)}}>25</button>
                <button type="button" onClick={() => {props.handler(50)}}>50</button>
            </section>
        </React.Fragment>
    )
});

export default Limit;