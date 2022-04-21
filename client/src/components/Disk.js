import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Disk.scss";
import Avatar from "./Avatar";

const classNames = require("classnames");
class Disk extends Component {
  render() {
    const item = this.props.item; 
    const href = this.props.href;
    const hover = this.props.hover; 

    return (
      <Link
        to={item.href}
        // target={href ? "_blank" : ""}
        // rel={href ? "noopener noreferrer" : ""}
        title={item.label}
        className={classNames(
          "ps5-disk",
          { "ps5-disk-mid": hover === "mid" },
          { "ps5-disk-min": hover === "min" },
          this.props.className
        )}
        style={{ backgroundImage: "url(" + item.cover + ")" }}
        onClick={this.props.onClick}
      >
        <div>
          {item.label && <h3>{item.label}</h3>}
          {item.profile && <Avatar />}
        </div>
      </Link>
    );
  }
}

export default Disk;
 