import React, { Component } from "react";
import { Link } from "react-router-dom";
import Social from "./Social.js";
import userImg from "../../assets/user-1.jpg";
import { navMenu } from "./topNav.js";
import "./Top.scss";

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
    const content = navMenu[current].content;

    if (content) {
      let apps = [];

      content.forEach((item) => {
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

  handleClickRight() {
    this.props.onClickModal(<Social />);
  }

  render() {
    return (
      <div className='ps5-top'>
        <ul>
          {navMenu.map((item, i) => {
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
          <li>
            <a
              href='#user'
              className='ps5-btn ps5-btn-mono'
              onClick={() => this.handleClickRight()}
            >
              <div id='user-active'>
                <img src={userImg} alt='' />
              </div>
            </a>
          </li>
          <li>
            <a href='#' className='ps5-top-btn active'>
              {this.state.time}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Top;
