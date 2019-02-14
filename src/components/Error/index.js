import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as flightActions from '../../actions/flightActions';
import Styles from './styles.module.css';
import LayoutStyles from '../../Layout.module.css';

class ErrorMessage extends Component {

  componentDidUpdate(prevProps, prevState) {
      if(this.props.message !== null) {
          setTimeout(() => {
              this.props.flightActions.clearError();
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

function mapDispatchToProps(dispatch) {
    return {
      flightActions: bindActionCreators(flightActions, dispatch)
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
