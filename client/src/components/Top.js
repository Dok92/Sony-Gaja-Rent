import React, { Component } from "react";
import { Link } from "react-router-dom";
import Social from "./Social.js";
import userImg from "../assets/user-1.png";
import "./Top.scss";
import { menuPrimary } from "../topNavigation.js";

const classNames = require("classnames");

class Top extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      time: "--:--",
    };
  }

  componentDidMount() {
    this.handleClickLeft(0);
    this.tick();
    this.clock = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  tick() {
    const today = new Date();
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    this.setState({
      time: today.getHours() + ":" + minutes,
    });
  }

  handleClickLeft(current) {
    const content = menuPrimary[current].content;

    if (content) {
      let apps = [];

      content.forEach((item, i) => {
        let app = item.app;
        if (app) {
          apps.push(item.app);
        }
      });

      if (!apps.length) {
        apps = false;
      }


      this.props.onClickMenu({
        apps,
        top: current,
      });
    }
  }

  // Open modal upon clicking the profile icon
  handleClickRight(type, modalContent) {
    if (type !== "sat") {
      this.props.onClickModal(modalContent);
    }
  }

  render() {
    const menuSecondary = [
      {
        // label: "user",
        url: "#user",
        content: <img src={userImg} alt="" />,
        modalContent: <Social />,
      },
      {
        label: "sat",
        // url: "#clock",
        content: "sat",
        // modalContent: (
        //   <div className="ps5-modal-dialog">
        //     <h2>Clock</h2>
        //   </div>
        // ),
      },
    ];

    return (
      <div className="ps5-top">
        <ul>
          {menuPrimary.map((item, i) => {
            return (
              <li key={i}>
                <Link
                  to={item.url}
                  className={classNames("ps5-top-btn", { 
                    active: this.props.top === i,
                  })}
                  onClick={() => this.handleClickLeft(i)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul>          
          {menuSecondary.map((item, i) => {
            const clock = item.label === "sat";
            return (
              <li key={i}>
                <a
                  href={item.url}
                  title={item.label}
                  className={
                    clock ? "ps5-top-btn active" : "ps5-btn ps5-btn-mono"
                  }
                  onClick={() =>
                    this.handleClickRight(item.label, item.modalContent)
                  }
                >
                  {clock ? this.state.time : item.content}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Top;
