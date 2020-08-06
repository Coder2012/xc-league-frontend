import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { pilotsService } from '../../services/pilots';
import Button from '../Button/index';
import ButtonStyles from '../Button/styles.module.css';
import Styles from './styles.module.css';
import Layout from '../../Layout.module.css';

export const PilotSearch = ({ clickHandler }) => {
  const $store = useStore(pilotsService.$);
  const [pilots, setPilots] = useState([]);
  const [state, setState] = useState({
    selectedId: undefined,
    showCount: 8,
    showMore: false,
    pattern: /_/
  });

  useEffect(() => {
    const pilots = $store.filter(pilot => state.pattern.test(pilot));
    setPilots(pilots);
  }, [$store.pilots, state.pattern]);

  const handleOnChange = e => {
    let value = e.target.value.length < 3 ? '_' : e.target.value;
    let pattern = new RegExp(`${value}`, 'i');

    setState(state => ({
      ...state,
      selectedId: undefined,
      showCount: 8,
      pattern: pattern
    }));
  };

  const handleSelectedPilot = (name, index) => {
    setState(state => ({ ...state, selectedId: index }));
    clickHandler(name);
  };

  const showMore = (
    <Button
      classes={[
        ButtonStyles['secondary-button'],
        ButtonStyles['secondary-button--alternate']
      ].join(' ')}
      text="Show more"
      clickHandler={() => setState(state => ({ ...state, showCount: 700 }))}
    />
  );

  return (
    <section className={[Layout['flex-column'], Styles.search].join(' ')}>
      <label className={Styles['search__name']}>Enter Pilot Name</label>
      <input
        className={Styles['search__input']}
        type="text"
        placeholder="eg. Philip Wallbank"
        onChange={handleOnChange}
      />
      <section className={Layout['v-space-around']}>
        {pilots.map((pilot, index) => {
          if (index < state.showCount) {
            return (
              <Button
                id={index}
                key={index}
                classes={[
                  ButtonStyles['secondary-button'],
                  state.selectedId === index
                    ? ButtonStyles['secondary-button--selected']
                    : ''
                ].join(' ')}
                clickHandler={() => handleSelectedPilot(`${pilot}`, index)}
                text={pilot}
              />
            );
          }
          return null;
        })}
        {pilots.length > state.showCount ? showMore : null}
      </section>
    </section>
  );
};
