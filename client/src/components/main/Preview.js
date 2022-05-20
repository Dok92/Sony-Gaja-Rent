import React, { Component } from "react";
import Profile from "./Profile";
import AddRent from "./AddRent";
import "./Preview.scss";

class Preview extends Component {
  render() {
    const item = this.props.app;  

    return (
      <div className="ps5-preview ps5-animate-from-bottom" key={item.label}> 
        <div>
          {item.title && <h2>{item.title}</h2>}

          {item.text && <p>{item.text}</p>}

          {item.renting && (
            <AddRent />
          )}

          {item.profile && (
            <Profile />
          )}
        </div>
      </div>
    );
  }
}

export default Preview;
