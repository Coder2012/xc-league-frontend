import React, { Component } from 'react';
import Flight from '../components/Flight';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            flights: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/flights')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({ flights: data.flights });
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.flights.map(flight => {
                    return <Flight key={flight.identifier} data={flight}/>    
                })}
            </React.Fragment>
        );
    }
}
 
export default Flights;