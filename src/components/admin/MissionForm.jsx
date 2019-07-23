import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Card from '../UI/Card';
import { GET_MISSION_BY_ID, UPDATE_MISSION } from '../../queries/missions';
import { toast } from 'react-toastify';
import TextEditor from '../UI/TextEditor';

const MissionForm = ({ missionid }) => (
  <Query query={GET_MISSION_BY_ID} variables={{ id: missionid }}>
    {({ loading, error, data: { missions } }) => {
      if (loading) return <p>Loading…</p>;
      if (error) return <p>Sorry! There was an error loading the items</p>;
      return (
        <Card className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">Mission Detail</h5>
            </div>
            <Mutation mutation={UPDATE_MISSION}>
              {updateMission => (
                <Formik
                  initialValues={{
                    quest: missions[0].quest,
                    score: missions[0].score,
                  }}
                  onSubmit={({ quest, score }, { setSubmitting }) => {
                    setSubmitting(true);
                    updateMission({
                      variables: {
                        id: missions[0]._id,
                        quest,
                        score,
                      },
                    }).then(() => {
                      setSubmitting(false);
                      toast.success('Data successfully updated');
                    });
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="name">Quest</label>
                        <TextEditor
                          value={values.quest}
                          language={
                            missions[0].stage.language
                              ? missions[0].stage.language
                              : 'javascript'
                          }
                          onChangeData={state => {
                            setFieldValue('quest', state);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Score</label>
                        <Field
                          type="number"
                          name="score"
                          className="form-control"
                          placeholder="Score"
                        />
                      </div>
                      <button className="btn btn-primary" type="submit">
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
    }}
  </Query>
);

export default MissionForm;
