import React from 'react';

const Controls = (props) => {
    return (
        <React.Fragment>
            <section>
                <button type="button" className="btn-primary" onClick={() => {props.handler('full')}}>Full</button>
                <button type="button" className="btn-primary" onClick={() => {props.handler('minimal')}}>Minimal</button>
                <button type="button" className="btn-primary" onClick={() => {props.paginationHandler('decrement')}}>Prev</button>
                <button type="button" className="btn-primary" onClick={() => {props.paginationHandler('increment')}}>Next</button>
            </section>
        </React.Fragment>
    );
}

export default Controls;