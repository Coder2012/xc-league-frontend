import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pilots: this.props.data,
            pattern: /_/
         }

         this.handleOnChange = this.handleOnChange.bind(this);
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
          pattern: new RegExp(`${value}`)
        });
      }

    handleSelectedPilot = (name) => {
        this.props.clickHandler(name);
    }

    render() { 
        return ( 
            <section>
                <label>Pilot Name:</label>
                <input type="text" placeholder="Enter name" onChange={this.handleOnChange}></input>
                <section>
                     {this.state.pilots
                        .filter(pilot => this.state.pattern.test(pilot))
                        .map((pilot, index) => {
                            return <button key={index} onClick={() => this.handleSelectedPilot(`${pilot}`)}>{pilot}</button>;
                        })}
                </section>
            </section>
         );
    }
}
 
export default Search;