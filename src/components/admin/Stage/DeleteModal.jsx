import React from 'react';
import { DELETE_STAGE } from '../../../queries/stages';
import { ConfirmModal } from 'react-bootstrap4-modal';
import { Mutation } from 'react-apollo';

const AdminCourseDeleteModal = ({ show, data, onClose }) => (
  <Mutation mutation={DELETE_STAGE}>
    {deleteStage => (
      <ConfirmModal
        visible={show}
        onOK={() => {
          deleteStage({
            variables: {
              id: data._id,
            },
          }).then(() => {
            onClose();
          });
        }}
        onCancel={onClose}
      >
        <h1>Hapus Data</h1>
      </ConfirmModal>
    )}
  </Mutation>
);

export default AdminCourseDeleteModal;
