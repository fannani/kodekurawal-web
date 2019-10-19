import React from 'react';

export default ({
                  value, setFieldValue, index, questionIndex, checked,
                }) => (
  <div className="form-group">
    <div className="form-inline">
      <div className="form-group">
        <div className="radio">
          <label className="radio-inline control-label">
            {/* <input */}
            {/*  className="form-check-input" */}
            {/*  type="radio" */}
            {/*  name={`choice${questionIndex}`} */}
            {/*  id={`choice${questionIndex}`} */}
            {/*  value={value} */}
            {/*  checked={checked} */}
            {/*  onChange={({ target }) => { */}
            {/*    setFieldValue(`questions.${questionIndex}.answer`, target.value); */}
            {/*  }} */}
            {/*  required */}
            {/* /> */}

          </label>
        </div>
      </div>
      <div className="form-group">
        <label style={{marginRight: "5px"}}>{`${String.fromCharCode(97 + index).toUpperCase()}.`}</label>
        <input
          type="text"
          className="form-control"
          value={value}
          placeholder={`Choice ${index + 1}`}
          onChange={({ target }) => {
            setFieldValue(`questions.${questionIndex}.choice[${index}]`, target.value);
          }}
          required
        />
      </div>
    </div>
  </div>
);
