import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import Home from "../components/home/Home.js";
import Background from "../components/Background.js";
import Top from "../components/topMenu/Top.js";
import Menu from "../components/slideMenu/Menu.js";
import Preview from "../components/main/Preview.js";
import Modal from "../components/topMenu/Modal.js";
import Witcher from "../assets/witcher.webp";
import "./Main.scss";


const classNames = require("classnames");

class Main extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      home: true,
      top: undefined,
      apps: [],
      appSelected: undefined,
      modal: false,
      modalContent: "",
      loadWitcher: false
    };
    this.keydownFunction = this.keydownFunction.bind(this);
    this.wrapper = React.createRef();
  }

  keydownFunction(e) {
    if (e.keyCode === 27) {
      this.modalClose();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownFunction, false);
  }

  modalClose() {
    this.setState({ modal: false });
  }

  modalOpen(data) {
    this.setState({ modal: true, modalContent: data });
  }

  navUpdate(data) {
    this.setState({
      apps: data.apps,
      top: data.top,
      appSelected: 0,
      loadWitcher: false
    });
    this.modalClose();
  }

  render() {
    const { apps, appSelected, home, top, modalContent, modal, loadWitcher } = this.state
    let app = false;
    let list = false;
    if (apps !== undefined) {
      app = apps[appSelected];
    }

    return (     
      <>
        <CSSTransition in={!home} timeout={2000} >
          <div
            className="ps5-page"
          >
            <Background apps={apps} appSelected={appSelected} />
            <div className="ps5-sheet" >
              <div 
                className={classNames("ps5-hero", "ps5-container", {
                  "ps5-hero-fullscreen": !list,
                })}
              >
                <Top
                  top={top}
                  onClickMenu={(e) => this.navUpdate(e)}
                  onClickModal={(e) => this.modalOpen(e)}
                  />

                <Menu
                  apps={apps}
                  appSelected={appSelected}
                  onClick={(e) => this.setState({ appSelected: e })} 
                  />

                {app && (
                  <Preview app={app} onClick={(e) => this.modalOpen(e)} />
                  )}
              </div>
            </div>
              {/* NOTE preloading img for seamles transition to /profile */}
            {loadWitcher && <img src={Witcher} id="load-witcher" alt=""></img>}
          </div>
        </CSSTransition>

        <CSSTransition in={home} timeout={1000} unmountOnExit> 
          <Home
            ref={this.wrapper}
            onClick={() => this.setState({ home: false, loadWitcher: true })}
          />
        </CSSTransition>

        <CSSTransition in={modal} timeout={400}>
          <Modal
            modalContent={modalContent}
            onClick={() => this.modalClose()}
            onReady={(e) => this.setState({ player: e })}
          />
        </CSSTransition>
      </>
    );
  }
}

export default Main
