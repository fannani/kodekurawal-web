import React from 'react';
import { Field } from 'formik';

<div className="form-check">
  <Field
    className="form-check-input"
    type="checkbox"
    name="continuous"
    id="continuous"
  />
  <label className="form-check-label" htmlFor="defaultCheck1">
    Continuous
  </label>
</div>;

const Checkbox = props => (
  <Field name={props.name}>
    {({ field, form }) => (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          {...props}
          checked={field.value.includes(props.value)}
          onChange={() => {
            if (field.value.includes(props.value)) {
              const nextValue = field.value.filter(
                value => value !== props.value,
              );
              form.setFieldValue(props.name, nextValue);
            } else {
              const nextValue = field.value.concat(props.value);
              form.setFieldValue(props.name, nextValue);
            }
          }}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          {props.value}
        </label>
      </div>
    )}
  </Field>
);
export default Checkbox;
