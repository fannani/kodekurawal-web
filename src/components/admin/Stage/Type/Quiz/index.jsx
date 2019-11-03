import React, { useRef } from 'react';
import {
  Field, FieldArray, Form, Formik,
} from 'formik';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MultipleChoice from './Type/MultipleChoice';
import Essay from './Type/Essay';
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {GET_QUIZ, UPDATE_QUIZ, questionType} from "../../../../../queries/quiz";
import {UPDATE_STAGE} from "../../../../../queries/stages";
import UploadAdapter from "../../../../../utils/UploadAdapter";
import {UPLOAD_FILE} from "../../../../../queries/file";

// TODO : Create tag for answer essay input, Hide score input

const initialQuestion = {
  stage: '',
  questionType: questionType.MULTIPLE_CHOICE,
  choice: ['', '', '', ''],
  answer: '',
  score: 30,
};

const QuestionField = ({ question, index, setFieldValue }) => {
  if (question.questionType === 'MULTIPLE_CHOICE') { return <MultipleChoice question={question} index={index} answer={question.answer} setFieldValue={setFieldValue} />; }
  return <Essay question={question} index={index} setFieldValue={setFieldValue} />;
};
export default ({ stage, history }) => {
  const formQuiz = useRef(null);
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_QUIZ, {
    variables: {
      stageid: stage._id,
    },
  });
  const [updateStage] = useMutation(UPDATE_STAGE);
  const [updateQuiz] = useMutation(UPDATE_QUIZ, {
    update(cache, { data: { updateQuiz: result } }) {
      cache.writeQuery({
        query: GET_QUIZ,
        variables: {
          stageid: stage._id,
        },
        data: { quiz: result },
      });
    },
    onCompleted() {
      toast.success("Successfully updated");
      formQuiz.current.setSubmitting(false);
    },
  });
  if (loading) return <p>Loading…</p>;
  if (error) {
    return (
      <p>Sorry! There was an error loading the items</p>
    );
  }
  const { quiz } = data;
  return (
    <Formik
      ref={formQuiz}
      initialValues={{
        title: stage.title,
        time: quiz ? quiz.time : 3000,
        questions: quiz ? quiz.questions : [initialQuestion],
      }}

      onSubmit={({ title, time, questions }, { setSubmitting }) => {
        updateStage({ variables: { title, id: stage._id } });
        const questionsData = questions.map((q) => ({
          answer: q.answer, choice: q.choice, content: q.content, score: q.score, questionType: q.questionType,
        }));
        updateQuiz({
          variables: {
            id: data.quiz._id,
            data: {
              time,
              questions: questionsData,
              stage: stage.id,
            },
          },
        });
        setSubmitting(true);
      }}
    >
      {({ values: { questions }, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              required

            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Time</label>
            <Field
              type="number"
              name="time"
              className="form-control"
              placeholder="Time"

            />
          </div>
          <FieldArray
            name="questions"
            render={(arrayHelpers) => (
              <div>
                {questions && questions.length > 0 ? (
                  questions.map((question, index) => (
                    <div key={index} className="row" style={{ marginTop: '20px' }}>
                      <div className="col-12">
                        <h5>
                          Question
                          {index + 1}
                        </h5>
                        <div className="form-group">
                          <label htmlFor="content">Question</label>
                           <div className="row">
                            <div className="col-12">
                               <CKEditor
                                editor={ClassicEditor}
                                data={question.content}
                                onInit={(editor) => {
                                  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                                    return new UploadAdapter(loader, client, UPLOAD_FILE);
                                  };
                                }}
                                onChange={(event, editor) => {
                                  setFieldValue(`questions.${index}.content`, editor.getData());
                                }}
                               />
                            </div>
                           </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="content">Type</label>
                          <Field
                            name={`questions.${index}.questionType`}
                            component="select"
                            placeholder="Type"
                            className="form-control"
                          >
                            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                            <option value="ESSAY">Essay</option>
                          </Field>
                        </div>
                        <QuestionField question={question} index={index} setFieldValue={setFieldValue} />
                        <div className="row justify-content-end">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => arrayHelpers.insert(index + 1, initialQuestion)}
                          >
                            Add
                          </button>
                          <button
                            style={{ marginLeft: '5px' }}
                            className="btn btn-danger"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <FontAwesomeIcon icon="trash" />

                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <button type="button" style={{ marginBottom: '10px' }} className="btn btn-primary" onClick={() => arrayHelpers.push(initialQuestion)}>
                    Add a Question
                  </button>
                )}
              </div>
            )}
          />
          <button
            type="button"
            className="btn btn-secondary"
            disabled={isSubmitting}
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginLeft: '10px' }}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};
