import React from 'react';
import Button from '../components/Button/index';
import Styles from '../components/Button/styles.css';
import Layout from '../Layout.css';

class Limit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedId: 0
        }
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedId !== this.props.selectedId) {
            this.setState({ selectedId: nextProps.selectedId });
        }
    }

    render() {
        return (
            <React.Fragment>
                <section className={[Layout['flex-row'], Layout['vertical-centre']].join(' ')}>
                    <p>Flights per page:</p>
                    <div>
                        {
                            [12, 24, 48].map((limit, index) => {
                                return <Button value={`${limit}`} key={index} classes={[Styles['secondary-button'], Styles['secondary-button--circle'], this.state.selectedId === index ? Styles['secondary-button--selected'] : ''].join(' ')}
                                                clickHandler={() => this.props.handler(`${limit}`, index)} />
                            })
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Limit;