import React from 'react';
import Button from '../components/Button/index';
import Styles from '../components/Button/styles.css';

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
                <section className="flex-row vertical-centre">
                    <p>Results per page:</p>
                    <div>
                        {
                            [10, 25, 50].map((limit, index) => {
                                return <Button key={index} classes={[Styles['secondary-button'], Styles['secondary-button--circle']].join(' ')}
                                                clickHandler={() => this.props.handler(`${limit}`)}
                                                text={limit} 
                                                />
                                // return <button key={index} type="button" className={"btn-secondary" + (index === this.state.id ? ' btn-secondary--selected' : '')} onClick={() => {
                                //     this.setState({id: index})
                                //     this.props.handler(`${limit}`);
                                // }}>{limit}</button>
                            })
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Limit;