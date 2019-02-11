import React from "react";
import Button from "../components/Button/index";
import Styles from "../components/Button/styles.module.css";
import Layout from "../Layout.module.css";

class Limit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    if(props.selectedId !== state.selectedId) {
      return {
        selectedId: props.selectedId
      }
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <section
          className={[Layout["flex-row"], Layout["vertical-centre"]].join(" ")}
        >
          <p>Flights per page:</p>
          <div>
            {[12, 24, 48].map((limit, index) => {
              return (
                <Button
                  value={`${limit}`}
                  key={limit}
                  classes={[
                    Styles["secondary-button"],
                    Styles["secondary-button--circle"],
                    this.state.selectedId === index
                      ? Styles["secondary-button--selected"]
                      : ""
                  ].join(" ")}
                  clickHandler={() => this.props.handler(`${limit}`, index)}
                />
              );
            })}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Limit;
