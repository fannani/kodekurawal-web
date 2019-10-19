import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_STAGE } from '../../../queries/stages';
import { Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap4-modal';

const StageType =  {
    PROGRAMMING : "PROGRAMMING",
    MATERIAL : "MATERIAL",
    QUIZ : "QUIZ",
}

const AdminStageCreateModal = ({ show, onClose, onSuccess, courseid }) => (
  <Modal visible={show} onClickBackdrop={onClose}>
    <div className="modal-header">
      <h5 className="modal-title">Add Stage</h5>
    </div>
    <Mutation mutation={ADD_STAGE}>
      {addStage => (
        <Formik
          initialValues={{
            title: '',
            type : StageType.PROGRAMMING
          }}
          onSubmit={({ title, type }, { setSubmitting }) => {
            setSubmitting(true);
            addStage({
              variables: {
                title,
                course: courseid,
                type: type,
              },
            }).then(({ data: { addStage: result } }) => {
              setSubmitting(false);
              onSuccess(result._id);
            });
          }}
        >
          {() => (
            <Form>
              <div className="modal-body">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <Field
                      className="form-control"
                      type="text"
                      placeholder="title"
                      name="title"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Type</label>
                    <Field
                      className="form-control"
                      component="select"
                      placeholder="title"
                      name="type"
                    >
                      <option value="PROGRAMMING">Programming</option>
                      <option value="MATERIAL">Material</option>
                      <option value="QUIZ">Quiz</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Tambah
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  </Modal>
);

export default AdminStageCreateModal;
