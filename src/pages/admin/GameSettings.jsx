import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap4-modal';
import { GET_PLAYERLEVEL, ADD_PLAYERLEVEL } from '../../queries/playerlevel';
import Card from '../../components/UI/Card';
import { GET_TESTCASE_MISSION } from '../../queries/missions';

const GameSetting = () => {
  const [showModal, setShowModal] = useState(false);
  const success = () => {
    setShowModal(false);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Level Requirement</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Add Level
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <Query query={GET_PLAYERLEVEL}>
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
                              <th>Level</th>
                              <th>Exp Requirement</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {data.playerlevel.map(level => (
                              <tr>
                                <td>{level.level}</td>
                                <td>{level.exp_req}</td>
                                <td>
                                  <button className="btn ">Detail</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    }}
                  </Query>
                  <Modal
                    visible={showModal}
                    onClickBackdrop={() => {
                      setShowModal(false);
                    }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title">Add Course</h5>
                    </div>

                    <Mutation
                      mutation={ADD_PLAYERLEVEL}
                      update={(cache, { data: { addPlayerLevel } }) => {
                        const { playerlevel } = cache.readQuery({
                          query: GET_PLAYERLEVEL,
                        });
                        cache.writeQuery({
                          query: GET_PLAYERLEVEL,
                          data: {
                            playerlevel: playerlevel.concat([addPlayerLevel]),
                          },
                        });
                      }}
                    >
                      {addPlayerLevel => (
                        <Formik
                          initialValues={{
                            level: '',
                            exp_req: '',
                          }}
                          onSubmit={(values, { resetForm }) => {
                            const { level, exp_req } = values;
                            addPlayerLevel({
                              variables: {
                                level,
                                exp_req,
                              },
                            }).then(({ data: { addPlayerLevel } }) => {
                              resetForm({
                                level: '',
                                exp_req: '',
                              });
                              success(addPlayerLevel._id);
                            });
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <div className="modal-body">
                                <div className="card-body">
                                  <div className="form-group">
                                    <label htmlFor="name">Level</label>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      placeholder="Level"
                                      name="level"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="desc">
                                      Exp Requirement
                                    </label>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      placeholder="Exp Requirement"
                                      name="exp_req"
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
                                  onClick={() => {
                                    setShowModal(false);
                                  }}
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
                  <Modal
                    visible={showModal}
                    onClickBackdrop={() => {
                      setShowModal(false);
                    }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title">Add Course</h5>
                    </div>

                    <Mutation
                      mutation={ADD_PLAYERLEVEL}
                      update={(cache, { data: { addPlayerLevel } }) => {
                        const { playerlevel } = cache.readQuery({
                          query: GET_PLAYERLEVEL,
                        });
                        cache.writeQuery({
                          query: GET_PLAYERLEVEL,
                          data: {
                            playerlevel: playerlevel.concat([addPlayerLevel]),
                          },
                        });
                      }}
                    >
                      {addPlayerLevel => (
                        <Formik
                          initialValues={{
                            level: '',
                            exp_req: '',
                          }}
                          onSubmit={(values, { resetForm }) => {
                            const { level, exp_req } = values;
                            addPlayerLevel({
                              variables: {
                                level,
                                exp_req,
                              },
                            }).then(({ data: { addPlayerLevel } }) => {
                              resetForm({
                                level: '',
                                exp_req: '',
                              });
                              success(addPlayerLevel._id);
                            });
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <div className="modal-body">
                                <div className="card-body">
                                  <div className="form-group">
                                    <label htmlFor="name">Level</label>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      placeholder="Level"
                                      name="level"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="desc">
                                      Exp Requirement
                                    </label>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      placeholder="Exp Requirement"
                                      name="exp_req"
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
                                  onClick={() => {
                                    setShowModal(false);
                                  }}
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
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default GameSetting;
