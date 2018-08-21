import React, { Component } from 'react';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        fetch('http://localhost:3000/flights')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.flights);
        });
    }

    render() { 
        return ( 
            <div>Flights here</div>
        );
    }
}
 
export default Flights;