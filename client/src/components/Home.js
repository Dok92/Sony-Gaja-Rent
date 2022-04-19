import React, { Component } from "react";
import { Link } from "react-router-dom";
import Canvas from "./Canvas.js";
import Register from "../containers/Register.js";
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: true, 
    }; 
  }

  
  render() {
    return (
      <div className='ps5-home'>
        <>
          <Canvas settings={this.props.settings} />
          <div className='ps5-home-content'>
          <Register />
            <p>Nakon prijavljivanja, pritisni START</p>

            <Link
              to='/rent'
              className='ps5-btn ps5-btn-mono ps5-btn-lg focus ps5-home-btn'
              onClick={() => this.props.onClick()}
            >
              <i className='material-icons'>power_settings_new</i>
              <div className='ps5-shine focus'></div>
              <div className='ps5-shine focus'></div>
              <div className='ps5-shine focus'></div>
            </Link>
          </div>
        </>
      </div>
    );
  }
}

export default Home;
