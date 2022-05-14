import React, { Component } from "react";
import "./Modal.scss";

class Modal extends Component {
  render() {
    const modalContent = this.props.modalContent;

    return (
      <div className={"ps5-modal"} onClick={() => this.props.onClick()}>
        <div className="ps5-modal-wrapper" onClick={(e) => e.stopPropagation()}>
          {modalContent}
          <a
            href="#modal-close"
            title="Zatvori"
            className="ps5-btn ps5-btn-mono ps5-modal-btn"
            onClick={() => this.props.onClick()}
          >
            <i className="material-icons">close</i>
          </a>
        </div>
      </div>
    );
  }
}

export default Modal;
