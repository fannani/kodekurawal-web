import Modal from 'react-bootstrap4-modal';
import React from 'react';

const OutOfEnergyModal = ({history, show, courseid}) => (
  <Modal visible={show}>
    <div className="modal-header">
      <h5 className="modal-title">Kekurangan Energi</h5>
    </div>
    <div className="modal-body">
      <h4>Energi anda habis, silahkan tambah energi</h4>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          history.push(`/course/${courseid}`);
        }}
      >
        OK
      </button>
    </div>
  </Modal>
);

export default OutOfEnergyModal;
