import React, { useState } from 'react';

import Card from '../../components/UI/Card';

import { Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap4-modal';
import { ADD_AVATAR, GET_AVATARS } from '../../queries/avatar';
import { Mutation, Query } from 'react-apollo';
import { GET_COURSES } from '../../queries/courses';
import { Link } from 'react-router-dom';

const Avatar = () => {
  const [show, setShow] = useState(false);
  const handleCreate = () => {
    setShow(true);
  };
  const handleModalClosed = () => {
    setShow(false);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Avatar</h5>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="btn btn-primary"
                >
                  Add Avatar
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <Query query={GET_AVATARS}>
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
                              <th scope="col">MIN EXP</th>
                              <th scope="col">ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.avatars.map(avatar => (
                              <tr key={avatar._id}>
                                <td>{avatar.title}</td>
                                <td>{avatar.min_exp}</td>
                                <td>
                                  <Link
                                    className="btn"
                                    to={`/admin/avatar/${avatar._id}`}
                                  >
                                    Detail
                                  </Link>
                                  <button className="btn btn-danger">
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
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
      <Modal visible={show} onClickBackdrop={handleModalClosed}>
        <div className="modal-header">
          <h5 className="modal-title">Add Ava</h5>
        </div>
        <Mutation mutation={ADD_AVATAR}>
          {addAvatar => (
            <Formik
              initialValues={{
                title: '',
                min_exp: null,
                image: null,
              }}
              onSubmit={({ title, min_exp, image }) => {
                addAvatar({
                  variables: {
                    title,
                    min_exp,
                    image,
                  },
                }).then(({ data: { addAvatar } }) => {
                  setShow(false);
                });
              }}
            >
              {({ setFieldValue }) => (
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
                        <label htmlFor="name">Minimal Exp</label>
                        <Field
                          className="form-control"
                          type="number"
                          placeholder="Minimal Exp"
                          name="min_exp"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="file">Image</label>
                        <input
                          id="image"
                          name="image"
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
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>

                    <button
                      type="button"
                      onClick={handleModalClosed}
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
  );
};
export default Avatar;
