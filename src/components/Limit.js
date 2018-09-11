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

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(limit, index) {
        this.setState(prevState => {
            return { 
                skipUpdate: prevState.selectedId === index,
                selectedId: index 
            };
        }, () => {
            if(!this.state.skipUpdate) {
                this.props.handler(`${limit}`)
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <section className={[Layout['flex-row'], Layout['vertical-centre']].join(' ')}>
                    <p>Flights per page:</p>
                    <div>
                        {
                            [10, 25, 50].map((limit, index) => {
                                return <Button value={`${limit}`} key={index} classes={[Styles['secondary-button'], Styles['secondary-button--circle'], this.state.selectedId === index ? Styles['secondary-button--selected'] : ''].join(' ')}
                                                clickHandler={() => this.clickHandler(`${limit}`, index)} />
                            })
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Limit;