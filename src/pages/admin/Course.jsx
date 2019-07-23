import React, { useState } from 'react';
import Modal, { ConfirmModal } from 'react-bootstrap4-modal';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { ADD_COURSE, GET_COURSES } from '../../queries/courses';
import Card from '../../components/UI/Card';
import { DELETE_COURSE } from '../../queries/courses';

const Course = ({ history }) => {
  const [delConfirm, setDelConfirm] = useState(false);
  const [delData, setDelData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [idCourse, setIdCourse] = useState('');
  const createCourse = () => {
    setShowModal(true);
  };

  const modalClosed = () => {
    setShowModal(false);
    setDelConfirm(false);
  };

  const success = id => {
    setShowModal(false);
    setIdCourse(id);

    history.push(`/admin/course/${idCourse}`);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Course</h5>
                <button onClick={createCourse} className="btn btn-primary">
                  Add Course
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <div>
                    <Query query={GET_COURSES}>
                      {({ loading, error, data }) => {
                        if (loading) return <p>Loading…</p>;
                        if (error)
                          return (
                            <p>Sorry! There was an error loading the items</p>
                          );
                        return (
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">TITLE</th>
                                <th scope="col">DESCRIPTION</th>
                                <th scope="col">ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.courses.map(course => (
                                <tr key={course._id}>
                                  <td>{course.name}</td>
                                  <td>{course.desc}</td>
                                  <td>
                                    <Link
                                      className="btn"
                                      to={`/admin/course/${course._id}`}
                                    >
                                      Detail
                                    </Link>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        setDelConfirm(true);
                                        setDelData(course);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        );
                      }}
                    </Query>
                    <Modal visible={showModal} onClickBackdrop={modalClosed}>
                      <div className="modal-header">
                        <h5 className="modal-title">Add Course</h5>
                      </div>

                      <Mutation mutation={ADD_COURSE}>
                        {addCourse => (
                          <Formik
                            initialValues={{
                            name: '',
                            desc: '',
                            image: null,
                          }}
                            onSubmit={values => {
                              const { image, name, desc} = values;
                              addCourse({
                                variables: {
                                  file: image,
                                  name,
                                  desc,
                                },
                              }).then(({ data: { addCourse } }) => {
                                success(addCourse._id);
                              });
                            }}
                          >
                            {({ setFieldValue }) => (
                              <Form>
                                <div className="modal-body">
                                  <div className="card-body">
                                    <div className="form-group">
                                      <label htmlFor="name">Name</label>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="desc">Description</label>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        placeholder="description"
                                        name="desc"
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="file">Course Image</label>
                                      <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        onChange={event => {
                                          setFieldValue(
                                            'image',
                                            event.currentTarget.files[0],
                                          );
                                        }}
                                        className="form-control-file"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
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
                            )}
                          </Formik>
                        )}
                      </Mutation>
                    </Modal>

                    <Mutation mutation={DELETE_COURSE}>
                      {deleteCourse => (
                        <ConfirmModal
                          visible={delConfirm}
                          onOK={() => {
                            deleteCourse({
                              variables: {
                                id: delData._id,
                              },
                            }).then(() => {
                              modalClosed();
                            });
                          }}
                          onCancel={modalClosed}
                        >
                          <h1>Hapus Data</h1>
                        </ConfirmModal>
                      )}
                    </Mutation>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};
export default Course;
