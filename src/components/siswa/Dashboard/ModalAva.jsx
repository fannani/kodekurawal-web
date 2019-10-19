import Modal from 'react-bootstrap4-modal';
import * as PropTypes from 'prop-types';
import React from 'react';

const ModalAva = ({ visible, onClickBackdrop, data, content }) => (
  <Modal visible={visible} onClickBackdrop={onClickBackdrop}>
    <div className="modal-header">
      <h5 className="modal-title">Pilih Avatar</h5>
    </div>
    <div className="modal-body">
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {data.players[0].avatars.map(content)}
      </div>
    </div>
  </Modal>
);

ModalAva.propTypes = {
  visible: PropTypes.bool,
  onClickBackdrop: PropTypes.func,
  data: PropTypes.any,
  content: PropTypes.func,
};

export default ModalAva;
