import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import Modal from 'react-bootstrap4-modal';
import { Field, Form, Formik } from 'formik';
import {
  GET_ACHIEVEMENT,
  ADD_DETAIL_ACHIEVEMENT,
} from '../../queries/achievement';
import Card from '../../components/UI/Card';

const AchievementDetail = ({
  match: {
    params: { achievementid },
  },
}) => {
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
                <h5 className="card-title">Achievement Detail</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Add Star
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <Query
                    query={GET_ACHIEVEMENT}
                    variables={{ id: achievementid }}
                  >
                    {({ loading, error, data: { achievements } }) => {
                      if (loading) return <p>Loading…</p>;
                      if (error)
                        return (
                          <p>Sorry! There was an error loading the items</p>
                        );
                      return (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Star</th>
                              <th>Caption</th>
                              <th>Target Point</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {achievements[0].detail.map(d => (
                              <tr>
                                <td>{d.star}</td>
                                <td>{d.caption}</td>
                                <td>{d.target_point}</td>
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
                      <h5 className="modal-title">Add Achievement</h5>
                    </div>

                    <Mutation mutation={ADD_DETAIL_ACHIEVEMENT}>
                      {addDetailAchievement => (
                        <Formik
                          initialValues={{
                            star: '',
                            caption: '',
                            target_point: '',
                          }}
                          onSubmit={(
                            { star, caption, target_point },
                            { resetForm },
                          ) => {
                            addDetailAchievement({
                              variables: {
                                achievement: achievementid,
                                star,
                                caption,
                                target_point,
                              },
                            }).then(
                              ({ data: { addDetailAchievement: detail } }) => {
                                resetForm({
                                  star: '',
                                  caption: '',
                                  target_point: '',
                                });
                                success(detail._id);
                              },
                            );
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <div className="modal-body">
                                <div className="card-body">
                                  <div className="form-group">
                                    <label htmlFor="name">Star</label>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      placeholder="Star"
                                      name="star"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="name">Caption</label>
                                    <Field
                                      className="form-control"
                                      type="text"
                                      placeholder="Caption"
                                      name="caption"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="name">Target Point</label>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      placeholder="Target Point"
                                      name="target_point"
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

export default AchievementDetail;
