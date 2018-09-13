import React from 'react';
import Button from './Button';
import ButtonStyles from '../components/Button/styles.css';
import Layout from '../Layout.css';
import LeftArrowSVG from '../assets/left-arrow.svg';
import RightArrowSVG from '../assets/right-arrow.svg';

const Controls = (props) => {
    return (
        <React.Fragment>
            <section className={[Layout['flex-row'], Layout['vertical-centre'], Layout['horizontal-centre'], Layout['h-space-around']].join(' ')}>
                <Button classes={[ButtonStyles['secondary-button'], ButtonStyles['secondary-button--circle'], ButtonStyles['secondary-button--circle-alternate']].join(' ')}
                                clickHandler={() => props.paginationHandler('decrement')}
                                iconStyle={ButtonStyles['secondary-button__icon']}
                                icon={LeftArrowSVG} />
                <p>Page {props.page}/{props.pages}</p>
                <Button classes={[ButtonStyles['secondary-button'], ButtonStyles['secondary-button--circle'], ButtonStyles['secondary-button--circle-alternate']].join(' ')}
                                clickHandler={() => props.paginationHandler('increment')}
                                iconStyle={ButtonStyles['secondary-button__icon']}
                                icon={RightArrowSVG} />
            </section>
        </React.Fragment>
    );
}

export default Controls;