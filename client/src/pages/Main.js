import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import Home from "../components/home/Home.js";
import Background from "../components/Background.js";
import Top from "../components/topMenu/Top.js";
import Menu from "../components/slideMenu/Menu.js";
import Preview from "../components/main/Preview.js";
import Modal from "../components/topMenu/Modal.js";
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
      lists: false,
      player: false,
      modal: false,
      modalContent: "",
      scrolled: false,
      settings: false,
    };
    this.keydownFunction = this.keydownFunction.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.wrapper = React.createRef();
  }

  keydownFunction(e) {
    if (e.keyCode === 27) {
      this.modalClose();
    }
  }

  scrollFunction(e) {
    if (window.scrollY > 100) {
      this.setState({
        scrolled: true,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownFunction, false);
    window.addEventListener("scroll", this.scrollFunction);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownFunction, false);
    window.removeEventListener("scroll", this.scrollFunction);
  }

  modalClose() {
    this.setState({ modal: false });
    if (this.state.player) {
      this.state.player.pauseVideo();
    }
  }

  modalOpen(data) {
    this.setState({ modal: true, modalContent: data });
    if (this.state.player) {
      this.state.player.playVideo();
    }
  }

  navUpdate(data) {
    this.setState({
      apps: data.apps,
      top: data.top,
      appSelected: 0,
    });
    this.modalClose();
  }

  render() {
    const { apps, appSelected, home, scrolled, top, modalContent, modal } = this.state
    let app = false;
    let list = false;
    if (apps !== undefined) {
      app = apps[appSelected];
    }

    return (     
      <>
        <CSSTransition in={!home} timeout={2000} >
          <div
            className={classNames("ps5-page", {
              "ps5-page-scroll": scrolled,
            })}
          >
            <Background apps={apps} appSelected={appSelected} />

            <div className={"ps5-sheet"} >
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
          </div>
        </CSSTransition>

        <CSSTransition in={home} timeout={1000} unmountOnExit> 
          <Home
            ref={this.wrapper}
            onClick={() => this.setState({ home: false })}
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
