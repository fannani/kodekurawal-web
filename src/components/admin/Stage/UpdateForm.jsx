import React from 'react';
import { Mutation } from 'react-apollo';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import AceEditor from 'react-ace';

import 'prismjs/themes/prism.css';
import 'brace/theme/tomorrow';
import 'brace/mode/html';

import Card from '../../UI/Card';
import { UPDATE_STAGE } from '../../../queries/stages';
import TextEditor from '../../UI/TextEditor';

const UpdateForm = ({ stage }) => {
  return (
    <Card className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">Stage Detail</h5>
        </div>

        <Mutation mutation={UPDATE_STAGE}>
          {updateStage => (
            <Formik
              initialValues={{
                title: stage.title,
                teory: stage.teory,
                time: stage.time ? stage.time : '',
                exp_reward: stage.exp_reward ? stage.exp_reward : '',
                script: stage.script ? stage.script : '',
                language: stage.language,
                image: undefined,
              }}
              onSubmit={(
                { image, title, time, teory, exp_reward, script, language },
                { setSubmitting },
              ) => {
                setSubmitting(true);
                updateStage({
                  variables: {
                    file: image,
                    title,
                    time,
                    teory,
                    exp_reward,
                    id: stage._id,
                    script,
                    language,
                  },
                }).then(() => {
                  setSubmitting(false);
                  toast.success('Data successfully updated');
                });
              }}
            >
              {({ setFieldValue, handleChange, values }) => (
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
                    <label htmlFor="name">Language</label>
                    <select
                      className="form-control"
                      id="language"
                      value={values.language}
                      onChange={handleChange}
                    >
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="javascript">Javascript</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ width: '70%' }}>
                    <label htmlFor="teory">Teory</label>
                    <TextEditor
                      value={values.teory}
                      language={
                        values.language ? values.language : 'javascript'
                      }
                      onChangeData={state => {
                        setFieldValue('teory', state);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="teory">Time</label>
                    <Field
                      className="form-control"
                      type="number"
                      name="time"
                      placeholder="Waktu"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exp_reward">Exp Reward</label>
                    <Field
                      className="form-control"
                      type="number"
                      name="exp_reward"
                      placeholder="Exp Reward"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Initial Script</label>
                    <AceEditor
                      mode="html"
                      theme="tomorrow"
                      value={values.script}
                      width="100%"
                      style={{ height: '200px' }}
                      setOptions={{
                        fontSize: '12pt',
                        vScrollBarAlwaysVisible: true,
                      }}
                      onChange={value => {
                        setFieldValue('script', value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="file">Stage Image</label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="form-control-file"
                      onChange={event => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Simpan
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
export default UpdateForm;
