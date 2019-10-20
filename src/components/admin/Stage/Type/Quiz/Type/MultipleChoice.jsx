import React from 'react';
import { Field, Form } from 'formik';
import Choice from './Choice';

export default ({
                  question, index, setFieldValue, answer,
                }) => {
  const choice = [];
  const option = [];
  for (let i = 0; i < 5; i++) {
    choice.push(<Choice
      value={question.choice[i]}
      checked={(question.choice[i] === answer)}
      setFieldValue={setFieldValue}
      questionIndex={index}
      index={i}
    />);
    option.push(<option value={question.choice[i]}>{question.choice[i]}</option>);
  }

  return (
    <>
      {choice}
      <div className="form-group">
        <label htmlFor="title">Choose correct answer</label>
        <Field component="select" className="form-control" name={`questions.${index}.answer`}>
          {option}
        </Field>
      </div>
    </>
  );
};
