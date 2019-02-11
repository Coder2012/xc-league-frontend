import React, { Component } from "react";
import Button from "../Button/index";
import ButtonStyles from "../Button/styles.module.css";
import Styles from "./styles.module.css";
import Layout from "../../Layout.module.css";

class PilotSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: undefined,
      showCount: 8,
      showMore: false,
      pilots: this.props.data,
      pattern: /_/
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectedPilot = this.handleSelectedPilot.bind(this);
  }

  componentDidMount() {
    this.showMore = (
      <Button
        classes={[
          ButtonStyles["secondary-button"],
          ButtonStyles["secondary-button--alternate"]
        ].join(" ")}
        text="Show more"
        clickHandler={() => this.setState({ showCount: 700 })}
      />
    );
  }

  static getDerivedStateFromProps(props, state) {
    if(props.data !== state.data) {
      return {
        pilots: props.data
      }
    }
    return null;
  }

  handleOnChange(e) {
    let value = e.target.value;
    value = e.target.value.length < 3 ? "_" : e.target.value;

    let pattern = new RegExp(`${value}`, "i");

    this.setState({
      selectedId: undefined,
      showCount: 8,
      pattern: pattern
    });
  }

  handleSelectedPilot(name, index) {
    this.setState(
      prevState => {
        return { selectedId: index };
      },
      () => {
        console.log(name);
        this.props.clickHandler(name);
      }
    );
  }

  render() {
    let pilots = this.state.pilots
      .filter(pilot => this.state.pattern.test(pilot))
      .map((pilot, index) => {
        if (index < this.state.showCount) {
          return (
            <Button
              id={index}
              key={index}
              classes={[
                ButtonStyles["secondary-button"],
                this.state.selectedId === index
                  ? ButtonStyles["secondary-button--selected"]
                  : ""
              ].join(" ")}
              clickHandler={() => this.handleSelectedPilot(`${pilot}`, index)}
              text={pilot}
            />
          );
        }
        return null;
      });

    return (
      <section className={[Layout["flex-column"], Styles.search].join(" ")}>
        <label className={Styles["search__name"]}>Enter Pilot Name</label>
        <input
          className={Styles["search__input"]}
          type="text"
          placeholder="eg. Philip Wallbank"
          onChange={this.handleOnChange}
        />
        <section className={Layout["v-space-around"]}>
          {pilots}
          {pilots.length > this.state.showCount ? this.showMore : null}
        </section>
      </section>
    );
  }
}

export default PilotSearch;
