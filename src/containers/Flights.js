import React, { Component } from 'react';
import Flight from '../components/Flight';
import Controls from '../components/Controls';
import Limit from '../components/Limit';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            flights: [],
            controls: {
                page: 1,
                limit: 10,
                responseType: 'full'
            }
        }

        this.responseTypeHandler = this.responseTypeHandler.bind(this);
        this.limitHandler = this.limitHandler.bind(this);
    }

    componentDidMount() {
        this.update();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(this.state.controls.responseType === nextState.controls.responseType) {
    //         console.log(this.state.controls.responseType)
    //         return false;
    //     }
    //     return true;
    // }

    responseTypeHandler(type) {
        console.log(type);
        this.setState({
            controls: { ...this.state.controls, responseType: type }
        }, () => {
            this.update();
        })
    }

    limitHandler(limit) {
        console.log(limit);
        this.setState({
            controls: { ...this.state.controls, limit: limit }
        }, () => {
            this.update();
        })
    }

    update() {
        this.getData().then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({ flights: data.flights });
        });
    }

    async getData () {
        return await fetch('http://localhost:3000/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({page: this.state.controls.page, limit: this.state.controls.limit, responseType: this.state.controls.responseType})
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Controls handler={this.responseTypeHandler}/>
                <Limit handler={this.limitHandler}/>
                {this.state.flights.length}
                {this.state.flights.map(flight => {
                    return <Flight key={flight.identifier} data={flight}/>    
                })}
            </React.Fragment>
        );
    }
}
 
export default Flights;