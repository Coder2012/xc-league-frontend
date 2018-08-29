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
        this.setState({
            pilots: nextProps.data
        })
    }

    handleOnChange(e) {
        let value = e.target.value === '' ? '_' : e.target.value;
        this.setState({
          pattern: new RegExp(`${value}`)
        });
      }

    render() { 
        return ( 
            <section>
                <input type="text" placeholder="Enter name" onChange={this.handleOnChange}></input>
                <section>
                     {this.state.pilots
                        .filter(pilot => this.state.pattern.test(pilot))
                        .map(pilot => {
                            return <button onClick={this.handler}>{pilot}</button>;
                        })}
                </section>
            </section>
         );
    }
}
 
export default Search;