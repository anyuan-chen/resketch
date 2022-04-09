import React from "react";
import ReactDOM from "react-dom";
import Body from "./body";
import Button from "./button";

const Modal = ({ isShowing, toggle, text, changeText, name, changeName }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div id="container">
                <div id="header">
                  <Body>
                    <div style={{ color: "black" }}>room code</div>
                  </Body>
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={toggle}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <input
                  id="form"
                  onChange={(event) => changeText(event.target.value)}
                  value={text}
                >
                  {}
                </input>
                <Body>
                  <div style={{ color: "black" }}>choose a name</div>
                </Body>
                <input
                  id="form"
                  onChange={(event) => changeName(event.target.value)}
                  value={name}
                >
                  {}
                </input>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <a href={`/play?method=join&guild=${text}&name=${name}`}>
                    <Button dark={true}>enter the room</Button>
                  </a>
                  <a href={`/host?guild=${123}`}>
                    <Button>host the room</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <style jsx>
            {`
              #container {
                display: flex;
                flex-direction: column;
                row-gap: 24px;
              }
              #header {
                display: flex;
                justify-content: space-between;
                width: 100%;
              }
              #form {
                height: 50px;
                width: 100%;
                border-radius: 16px;
                background: #e9e9e9;
                padding-left: 20px;
              }
              .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1040;
                width: 100vw;
                height: 100vh;
                background-color: #000;
                opacity: 0.5;
              }

              .modal-wrapper {
                position: fixed;
                top: 30%;
                left: 0;
                z-index: 1050;
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                outline: 0;
              }

              .modal {
                z-index: 100;
                background: white;
                position: relative;
                margin: 1.75rem auto;
                border-radius: 32px;
                max-width: 550px;
                padding: 2rem;
              }

              .modal-header {
                display: flex;
                justify-content: flex-end;
              }

              .modal-close-button {
                font-size: 1.4rem;
                font-weight: 700;
                line-height: 1;
                color: #000;
                opacity: 0.3;
                cursor: pointer;
                border: none;
              }

              button {
                font-size: 0.9rem;
                font-weight: 700;
                border: none;
                border-radius: 3px;
                padding: 0.3rem 1rem;
                margin-left: 0.5rem;
              }

              .button-default {
                background: #247ba0;
                color: #fff;
              }
            `}
          </style>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
