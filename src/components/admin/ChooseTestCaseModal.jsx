import { Query } from 'react-apollo';
import Modal from 'react-bootstrap4-modal';
import React from 'react';
import { GET_TESTCASES } from '../../queries/testcase';

const ChooseTestCaseModal = ({ show, modalClosed, onChoose }) => (
  <Modal visible={show} onClickBackdrop={modalClosed}>
    <div className="modal-header">
      <h5 className="modal-title">Add Test Case</h5>
    </div>

    <div className="modal-body">
      <div className="card-body">
        <Query query={GET_TESTCASES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">TEST CASE</th>
                    <th style={{ width: '10%' }} scope="col">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.testcase.map(testcase => (
                    <tr>
                      <td>{testcase.caption}</td>
                      <td>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => onChoose(testcase)}
                        >
                          Choose
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          }}
        </Query>
      </div>
    </div>
    <div className="modal-footer">
      <button type="submit" className="btn btn-primary">
        Tambah
      </button>

      <button type="button" onClick={modalClosed} className="btn btn-secondary">
        Close
      </button>
    </div>
  </Modal>
);

export default ChooseTestCaseModal;
