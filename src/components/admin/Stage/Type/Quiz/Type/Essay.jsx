import React, { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import '../../../../../../assets/styles/tag.scss';

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};
export default ({ question, index, setFieldValue }) => {
  const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const answerList = question.answer.split(' ');
    const answerTags = answerList.map((value) => ({ id: value, text: value }));
    if (answerList[0] !== '') {
      setTags(answerTags);
    }
  }, []);
  useEffect(() => {
    const tagsArr = tags.map((value) => value.text);
    setFieldValue(`questions.${index}.answer`, tagsArr.join(' '));
  }, [tags]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, tagIndex) => tagIndex !== i));
  };
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div className="form-group">
      <label htmlFor="Answer">Answer</label>
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        placeholder="Add new answer"
        delimiters={delimiters}
      />

    </div>
  );
};
