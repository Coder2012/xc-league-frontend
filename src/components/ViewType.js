import React from 'react';
import Button from './Button/index';
import ButtonStyles from './Button/styles.css';
import Layout from '../Layout.css';

const ViewType = (props) => {
    return (
            <section className={[Layout['flex-row'], Layout['vertical-centre']].join(' ')}>
                <p>Data:</p>
                <Button classes={ButtonStyles['secondary-button']}
                                clickHandler={() => props.handler('full')}
                                iconStyle={ButtonStyles['secondary-button__icon']}
                                text="Full" />
                <Button classes={ButtonStyles['secondary-button']}
                                clickHandler={() => props.handler('minimal')}
                                iconStyle={ButtonStyles['secondary-button__icon']}
                                text="Minimal" />
            </section>
    );
}
 
export default ViewType;