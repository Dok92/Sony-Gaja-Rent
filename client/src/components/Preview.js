import React, { Component } from "react";
import Profile from "../containers/Profile";
import AddRent from "./AddRent";
import Pricing from "./Pricing";
import "./Preview.scss";

class Preview extends Component {
  render() {
    const item = this.props.app;  

    return (
      <div className="ps5-preview ps5-animate-from-bottom" key={item.label}>
        <div>
          {item.title && <h2>{item.title}</h2>}

          {item.text && <p>{item.text}</p>}

          {item.pricing && (
            <Pricing />
          )}

          {item.renting && (
            <AddRent />
          )}

          {item.profile && (
            <Profile />
          )}

          {item.youtube && (
            <div className="ps5-btn-group">
              <a
                href="#play"
                className="ps5-btn ps5-btn-lg ps5-btn-primary"
                onClick={() =>
                  this.props.onClick({
                    type: "youtube",
                    element: item.youtube,
                  })
                }
              >
                Iznajmi
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Preview;
