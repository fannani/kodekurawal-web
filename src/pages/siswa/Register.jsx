import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { REGISTER } from '../../queries/users';

const Container = styled.div`
  max-width: 100% !important;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background: #9cecfb;
  background: -webkit-linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
  background: linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
`;

const Register = ({ history }) => (
  <Container className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <Mutation mutation={REGISTER}>
          {register => (
            <Formik
              initialValues={{
                email: '',
                password: '',
                name: '',
              }}
              onSubmit={(values, { setSubmitting, setStatus }) => {
                const { name, email, password } = values;
                setStatus(undefined);
                if (name && email && password) {
                  register({
                    variables: {
                      name,
                      email,
                      password,
                    },
                  })
                    .then(() => {
                      setSubmitting(false);
                      history.push('login');
                    })
                    .catch(({ graphQLErrors }) => {
                      setStatus({
                        email:
                          graphQLErrors[0].extensions.exception.validationErrors
                            .email,
                      });
                    });
                }
              }}
            >
              {({ isSubmitting, status }) => (
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Sign Up</h5>
                    {status && status.email ? (
                      <div className="alert alert-danger" role="alert">
                        {status.email}
                      </div>
                    ) : (
                      ''
                    )}
                    <Form className="form-signin">
                      <div className="form-label-group">
                        <Field
                          type="text"
                          name="name"
                          id="inputName"
                          className="form-control"
                          placeholder="Name"
                          required
                          autoFocus
                        />
                        <label htmlFor="inputName">Name</label>
                      </div>
                      <div className="form-label-group">
                        <Field
                          type="email"
                          name="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email address"
                          required
                          autoFocus
                        />
                        <label htmlFor="inputEmail">Email address</label>
                      </div>

                      <div className="form-label-group">
                        <Field
                          type="password"
                          name="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="inputPassword">Password</label>
                      </div>

                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </button>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>
          )}
        </Mutation>
      </div>
    </div>
  </Container>
);

export default Register;
