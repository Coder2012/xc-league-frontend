import React, { Component } from 'react';
import Button from '../Button/index';
import ButtonStyles from '../Button/styles.css';
import Styles from './styles.css';
import Layout from '../../Layout.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showCount: 8,
            showMore: false,
            pilots: this.props.data,
            pattern: /_/
         }

         this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this.showMore = <Button classes={[ButtonStyles['secondary-button'], ButtonStyles['secondary-button--alternate']].join(' ')}
                                text="Show more" 
                                clickHandler={() => this.setState({ showCount: 100 })} />
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data) {
            this.setState({
                pilots: nextProps.data
            })
        }
    }

    handleOnChange(e) {
        let value = e.target.value === '' ? '_' : e.target.value;
        this.setState({
            showCount: 8,
            pattern: new RegExp(`${value}`)
        });
      }

    handleSelectedPilot = (name) => {
        console.log(name)
        this.props.clickHandler(name);
    }

    render() { 
        let pilots = this.state.pilots
            .filter(pilot => this.state.pattern.test(pilot))
            .map((pilot, index) => {
                if (index < this.state.showCount) {
                    return (
                        <Button key={index} classes={[ButtonStyles['secondary-button'], this.props.searchType === 'date' ? ButtonStyles['secondary-button--selected'] : ''].join(' ')} 
                        clickHandler={() => this.handleSelectedPilot(`${pilot}`)} 
                        text={pilot} />
                    )
                }
            });

        return ( 
            <section className={[Layout['flex-column'], Styles.search].join(' ')}>
                <label className={Styles['search__name']}>Enter Pilot Name</label>
                <input className={Styles['search__input']} type="text" placeholder="eg. Philip Wallbank" onChange={this.handleOnChange}></input>
                <section>
                    {pilots}
                    {pilots.length > this.state.showCount ? this.showMore : null }
                </section>
            </section>
         );
    }
}
 
export default Search;