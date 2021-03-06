import React, { Component } from "react";
import Profile from "./Profile";
import AddRent from "./AddRent";
import Trophies from "./Trophies";
import "./Preview.scss";

class Preview extends Component {
  render() {
    const item = this.props.app;

    return (
      <div className='ps5-preview ps5-animate-from-bottom' key={item.label}>
        {item.title && <h2>{item.title}</h2>}

        {item.text && <p>{item.text}</p>}

        {item.renting && <AddRent />}

        {item.profile && <Profile />}

        {item.trophies && <Trophies />}
      </div>
    );
  }
}

export default Preview;
