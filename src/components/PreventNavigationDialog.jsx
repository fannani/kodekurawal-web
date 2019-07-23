import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import shortid from 'shortid';
import Modal from 'react-bootstrap4-modal';

const __trigger = Symbol.for(`__PreventNavigationDialog_${shortid.generate()}`);
let nextLocation;
let allowRedirect = false;

const PreventNavigationDialog = ({ when, title, message, history }) => {
  const [open, setOpen] = useState(false);
  const show = allowTransitionCallback => {
    if (allowRedirect) {
      allowTransitionCallback(true);
      allowRedirect = false;
    } else {
      setOpen(true);
      allowTransitionCallback(false);
    }
  };

  const handleNo = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    allowRedirect = true;
    history.push(nextLocation);
  };

  const handleTransition = location => {
    nextLocation = location.pathname;
    return Symbol.keyFor(__trigger);
  };

  useEffect(() => {
    allowRedirect = false;
    window[__trigger] = show;
    return () => {
      delete window[__trigger];
    };
  }, []);

  return (
    <React.Fragment>
      <Prompt when={when} message={handleTransition} />
      <Modal visible={open}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">{message}</div>
        <div className="modal-footer">
          <button
            onClick={handleNo}
            type="button"
            className="btn btn-secondary"
          >
            No
          </button>
          <button
            onClick={handleYes}
            type="button"
            className="btn btn-secondary"
          >
            Yes
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default PreventNavigationDialog;
