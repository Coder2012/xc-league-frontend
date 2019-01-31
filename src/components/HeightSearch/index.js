import React, { Component } from "react";

class HeightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    };

    this.selectedHandler = this.selectedHandler.bind(this);
  }

  selectedHandler(value, index) {
    this.setState({ selectedId: parseInt(index) });
    this.props.clickHandler(parseInt(value));
  }

  render() {
    return (
      <form>
        <fieldset>
          <legend>Flights heigher than</legend>
          {[7000, 8000, 9000, 10000].map((item, index) => {
            return (
              <li key={index}>
                <label htmlFor={`${item}`}>
                  <input
                    name={`${item}`}
                    id={index}
                    type="radio"
                    value="{item}"
                    checked={index === this.state.selectedId}
                    onClick={() => this.selectedHandler(`${item}`, index)}
                  />
                  {item}ft
                </label>
              </li>
            );
          })}
        </fieldset>
      </form>
    );
  }
}

export default HeightSearch;
