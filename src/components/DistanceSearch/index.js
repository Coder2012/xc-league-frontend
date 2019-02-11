import React, { Component } from 'react';
import Button from '../Button';
import ButtonStyles from '../Button/styles.module.css';
import Styles from './styles.module.css';
import Layout from '../../Layout.module.css';

class DistanceSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: this.props.selectedId
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selectedId !== state.selectedId) {
      return {
        selectedId: props.selectedId
      }
    }
    return null;
  }

  render() {
    return (
      <form>
        <div
          className={[
            Layout['flex-row'],
            Layout['vertical-centre'],
            Layout['horizontal-centre'],
            Styles['distance']
          ].join(' ')}
        >
          <legend>Score greater than</legend>
          {[150, 200, 250].map((limit, index) => {
            return (
              <Button
                value={`${limit}`}
                key={index}
                classes={[
                  ButtonStyles['secondary-button'],
                  ButtonStyles['secondary-button--circle'],
                  this.state.selectedId === index
                    ? ButtonStyles['secondary-button--selected']
                    : ''
                ].join(' ')}
                clickHandler={() =>
                  this.props.clickHandler(parseInt(`${limit}`), index)
                }
              />
            );
          })}
        </div>
      </form>
    );
  }
}

export default DistanceSearch;
