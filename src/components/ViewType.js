import React from "react";
import Button from "./Button/index";
import ButtonStyles from "./Button/styles.module.css";
import Layout from "../Layout.module.css";

class ViewType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(type, index) {
    this.setState(
      prevState => {
        return {
          skipUpdate: prevState.selectedId === index,
          selectedId: index
        };
      },
      () => {
        if (!this.state.skipUpdate) {
          this.props.handler(type);
        }
      }
    );
  }

  render() {
    return (
      <section
        className={[Layout["flex-row"], Layout["vertical-centre"]].join(" ")}
      >
        <p className={Layout["h-spacing-right"]}>Data:</p>
        <Button
          classes={[
            ButtonStyles["secondary-button"],
            this.state.selectedId === 0
              ? ButtonStyles["secondary-button--selected"]
              : ""
          ].join(" ")}
          clickHandler={() => this.clickHandler("full", 0)}
          iconStyle={ButtonStyles["secondary-button__icon"]}
          text="Full"
        />
        <Button
          classes={[
            ButtonStyles["secondary-button"],
            this.state.selectedId === 1
              ? ButtonStyles["secondary-button--selected"]
              : ""
          ].join(" ")}
          clickHandler={() => this.clickHandler("minimal", 1)}
          iconStyle={ButtonStyles["secondary-button__icon"]}
          text="Minimal"
        />
      </section>
    );
  }
}

export default ViewType;
