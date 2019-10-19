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
              }}
              onSubmit={({ name, desc }, { setSubmitting }) => {
                setSubmitting(true);
                updateCourse({
                  variables: {
                    id: courses._id,
                    name,
                    desc,
                  },
                }).then(() => {
                  setSubmitting(false);
                  toast.success(UPDATE_SUCCESS);
                });
              }}
            >
              {() => (
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
