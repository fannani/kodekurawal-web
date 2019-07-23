import React from 'react';
import { DELETE_TESTCASE_MISSION } from '../../../queries/testcase';
import { ConfirmModal } from 'react-bootstrap4-modal';
import { Mutation } from 'react-apollo';

const AdminTestcaseDeleteModal = ({ show, data, onClose }) => (
  <Mutation mutation={DELETE_TESTCASE_MISSION}>
    {deleteTestcase => (
      <ConfirmModal
        visible={show}
        onOK={() => {
          deleteTestcase({
            variables: {
              id: data,
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

export default AdminTestcaseDeleteModal;
