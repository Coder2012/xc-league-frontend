import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './styles.module.css';
import LayoutStyles from '../../Layout.module.css';
import * as types from '../../actions/actionTypes';

class ErrorMessage extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.message !== null) {
      setTimeout(() => {
        this.dispatch({
          type: types.CLEAR_ERROR,
          message: null
        });
      }, 2000);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.message && (
          <section className={LayoutStyles['text-centre']}>
            <h1 className={Styles.error}>{this.props.message}</h1>
          </section>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ results }) => ({
  message: results.message
});

export default connect(mapStateToProps)(ErrorMessage);
