import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import classNames from 'classnames';
import { pilotsService } from '../../services/pilots';
import { Button } from '../Button/index';
import Styles from './styles.module.scss';
import Layout from '../../layout.module.scss';

const SHOW_COUNT = 8;
const DEFAULT_SHOW_COUNT = 700;
const MIN_CHAR_LENGTH = 3;

export const PilotSearch = ({ clickHandler }) => {
  const $store = useStore(pilotsService.$);
  const [pilots, setPilots] = useState([]);
  const [state, setState] = useState({
    selectedId: undefined,
    showCount: SHOW_COUNT,
    showMore: false,
    pattern: /_/
  });

  useEffect(() => {
    const pilots = $store.filter(pilot => state.pattern.test(pilot));
    setPilots(pilots);
  }, [$store, state.pattern]);

  const handleOnChange = e => {
    let value = e.target.value.length < MIN_CHAR_LENGTH ? '_' : e.target.value;
    let pattern = new RegExp(`${value}`, 'i');

    setState(state => ({
      ...state,
      selectedId: undefined,
      showCount: SHOW_COUNT,
      pattern: pattern
    }));
  };

  const handleSelectedPilot = (name, index) => {
    setState(state => ({ ...state, selectedId: index }));
    clickHandler(name);
  };

  const showMore = (
    <Button
      secondary
      alternate
      clickHandler={() =>
        setState(state => ({ ...state, showCount: DEFAULT_SHOW_COUNT }))
      }
    >
      Show more
    </Button>
  );

  return (
    <section className={classNames(Layout.flexColumn, Styles.search)}>
      <label className={Styles['search__name']}>Enter Pilot Name</label>
      <input
        className={Styles['search__input']}
        type="text"
        data-testid="pilot-search"
        placeholder="eg. Philip Wallbank"
        onChange={handleOnChange}
      />
      <section className={Layout.vSpaceAround}>
        {pilots.map((pilot, index) => {
          if (index < state.showCount) {
            return (
              <Button
                id={index}
                key={index}
                secondary
                active={state.selectedId === index}
                clickHandler={() => handleSelectedPilot(`${pilot}`, index)}
              >
                {pilot}
              </Button>
            );
          }
          return null;
        })}
        {pilots.length > state.showCount ? showMore : null}
      </section>
    </section>
  );
};
