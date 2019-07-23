import { Mutation } from 'react-apollo';
import { Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap4-modal';
import React from 'react';
import {
  ADD_TESTCASE_MISSION,
  GET_TESTCASE_MISSION,
} from '../../queries/missions';

const TestCaseMissionModal = ({
  show,
  modalClosed,
  missionid,
  testCase,
  onFinish,
}) => (
  <Modal
    dialogClassName="modal-lg"
    visible={show}
    onClickBackdrop={modalClosed}
  >
    <div className="modal-header">
      <h5 className="modal-title">Add Test Case</h5>
    </div>
    <Mutation
      mutation={ADD_TESTCASE_MISSION}
      update={(cache, { data: { addTestCaseMission } }) => {
        const { testcaseMission } = cache.readQuery({
          query: GET_TESTCASE_MISSION,
          variables: { mission: missionid },
        });
        cache.writeQuery({
          query: GET_TESTCASE_MISSION,
          variables: { mission: missionid },
          data: {
            testcaseMission: testcaseMission.concat([addTestCaseMission]),
          },
        });
      }}
    >
      {addTestCaseMission => (
        <Formik
          initialValues={{ params: [] }}
          onSubmit={({ params: data }) => {
            addTestCaseMission({
              variables: {
                mission: missionid,
                testcase: testCase._id,
                params: data,
              },
            }).then(({ data: { addTestCaseMission } }) => {
              onFinish();
            });
          }}
        >
          {() => {
            const render = [];
            let testCaseCap = testCase.caption;
            let start;
            let end;
            let index;
            let text;
            let i = 0;
            do {
              start = testCaseCap.indexOf('$$');
              if (start !== -1) {
                end = testCaseCap.indexOf('$$', start + 2);
                index = testCaseCap.substring(start + 2, end);
                text = testCaseCap.substring(0, start);
                testCaseCap = testCaseCap.substring(
                  end + 2,
                  testCaseCap.length,
                );
                render.push(
                  <span className="form-span">{text}</span>,
                  <Field
                    className="form-control short"
                    type="text"
                    name={`params.${i}`}
                    placeholder={index}
                  />,
                );
              } else {
                render.push(<span className="form-span">{testCaseCap}</span>);
              }
              i += 1;
            } while (start !== -1);
            return (
              <Form>
                <div className="modal-body">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="d-flex">{render}</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Tambah
                  </button>

                  <button
                    type="button"
                    onClick={modalClosed}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </Mutation>
  </Modal>
);

export default TestCaseMissionModal;
