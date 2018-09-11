import React from 'react';
import Button from '../components/Button/index';
import Styles from '../components/Button/styles.css';
import Layout from '../Layout.css';

class Limit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0
        }
    }

    render() {
        return (
            <React.Fragment>
                <section className={[Layout['flex-row'], Layout['vertical-centre']].join(' ')}>
                    <p>Flights per page:</p>
                    <div>
                        {
                            [10, 25, 50].map((limit, index) => {
                                return <Button value={`${limit}`} key={index} classes={[Styles['secondary-button'], Styles['secondary-button--circle']].join(' ')}
                                                clickHandler={() => this.props.handler(`${limit}`)} />
                            })
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Limit;