import React from 'react';

const Controls = (props) => {
    return (
        <React.Fragment>
            <section>
                <button type="button" onClick={() => {props.handler('full')}}>Full</button>
                <button type="button" onClick={() => {props.handler('minimal')}}>Minimal</button>
            </section>
        </React.Fragment>
    );
}

export default Controls;