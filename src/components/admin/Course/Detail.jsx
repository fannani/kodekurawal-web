import React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_COURSE } from '../../../queries/courses';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { UPDATE_SUCCESS } from '../../../constants/notification';
import AceEditor from 'react-ace';
import Card from '../../UI/Card';

const AdminCourseDetail = ({ courses }) => {
  return (
    <Card className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">Detail Course</h5>
        </div>
        <Mutation mutation={UPDATE_COURSE}>
          {updateCourse => (
            <Formik
              initialValues={{
                name: courses.name,
                desc: courses.desc,
                image: undefined,
              }}
              onSubmit={({ name, desc ,image}, { setSubmitting }) => {
                setSubmitting(true);
                updateCourse({
                  variables: {
                    id: courses._id,
                    name,
                    desc,
                    file: image,
                  },
                }).then(() => {
                  setSubmitting(false);
                  toast.success(UPDATE_SUCCESS);
                });
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Description</label>
                    <Field
                      type="text"
                      name="desc"
                      component="textarea"
                      className="form-control"
                      placeholder="Description"
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

                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      </div>
    </Card>
  );
};

export default AdminCourseDetail;
