import React from 'react';
import Button from '../Button/index';
import UserSVG from '../../assets/user-icon.svg';
import CalendarSVG from '../../assets/calendar-icon.svg';
import Styles from './styles.css';

const Header = () => {
    return (
        <header className={Styles.header}>
            <Button icon={UserSVG} text='Search by pilot name' />
            <Button icon={CalendarSVG} text='Search by flight date' />
        </header>
    )
}
export default Header;