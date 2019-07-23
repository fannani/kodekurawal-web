import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import Card from '../../components/UI/Card';
import { GET_COURSE_BYID } from '../../queries/courses';
import { UPDATE_BADGE } from '../../queries/badges';
import AdminCourseDetail from '../../components/admin/Course/Detail';
import AdminStageCreateModal from '../../components/admin/Stage/CreateModal';
import AdminStageDeleteModal from '../../components/admin/Stage/DeleteModal';
import AdminStageList from '../../components/admin/Stage/List';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';

const StageList = ({
  history,
  match: {
    params: { courseid },
  },
}) => {
  const [showModal, setShowModal] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);
  const [delData, setDelData] = useState({});

  const createStage = () => {
    setShowModal(true);
  };

  const onSuccess = idp => {
    history.push(`/admin/stage/${idp}`);
  };

  const modalClosed = () => {
    setShowModal(false);
    setDelConfirm(false);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Query
          query={GET_COURSE_BYID}
          variables={{
            courseid,
          }}
        >
          {({ loading, error, data: { courses } }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <main className="col-12 main-container">
                <AdminCourseDetail courses={courses[0]} />
                <Mutation
                  mutation={UPDATE_BADGE}
                  update={(cache, { data: { updateBadge } }) => {
                    cache.writeQuery({
                      query: GET_COURSE_BYID,
                      variables: {
                        courseid,
                      },
                      data: {
                        courses: [{ ...courses[0], badge: updateBadge }],
                      },
                    });
                  }}
                >
                  {updateBadge => (
                    <Card className="card" style={{ marginTop: '20px' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title">Badge</h5>
                        </div>
                        <div className="row" style={{ marginTop: '20px' }}>
                          <div
                            className="col-12"
                            style={{
                              textAlign: courses[0].badge ? 'left' : 'center',
                            }}
                          >
                            {courses[0].badge ? (
                              <Formik
                                initialValues={{
                                  title: courses[0].badge.title,
                                  image: null,
                                }}
                                onSubmit={({ title, image }) => {
                                  updateBadge({
                                    variables: {
                                      id: courses[0].badge._id,
                                      title,
                                      image,
                                    },
                                  }).then(() => {
                                    toast.success('Data successfully updated');
                                  });
                                }}
                              >
                                {({ setFieldValue }) => (
                                  <Form>
                                    <div className="form-group">
                                      <label htmlFor="name">Title</label>
                                      <Field
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Title"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="file">Badge Image</label>
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

                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      style={{ marginLeft: '10px' }}
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </Form>
                                )}
                              </Formik>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary"
                                style={{ marginTop: '10px' }}
                                onClick={() => {
                                  updateBadge({
                                    variables: {
                                      course: courseid,
                                    },
                                  });
                                }}
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </Mutation>
                <Card className="card" style={{ marginTop: '20px' }}>
                  <div className="card-body">
                    <AdminStageList
                      onCreate={createStage}
                      stages={courses[0].stages}
                      courseid={courseid}
                      onDelete={stage => {
                        setDelConfirm(true);
                        setDelData(stage);
                      }}
                    />

                    <AdminStageCreateModal
                      show={showModal}
                      courseid={courseid}
                      onClose={modalClosed}
                      onSuccess={onSuccess}
                    />
                    <AdminStageDeleteModal
                      show={delConfirm}
                      onClose={modalClosed}
                      data={delData}
                    />
                  </div>
                </Card>
              </main>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default StageList;
