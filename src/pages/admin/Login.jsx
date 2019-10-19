import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import useAdmin from '../../hooks/admin';

const Container = styled.div`
  max-width: 100% !important;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background: #9cecfb;
  background: -webkit-linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
  background: linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
`;

const Login = () => {
  const admin = useAdmin();

  if (admin.isLogin) {
    return <Redirect push to="/admin" />;
  }
  return (
    <Container className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { setSubmitting, setStatus }) => {
                  setStatus(undefined);
                  const { email, password } = values;
                  if (email && password) {
                    admin.login(email, password).then(
                      () => {
                        setSubmitting(false);
                      },
                      () => {
                        setStatus({ error: 'Email atau Password salah' });
                        setSubmitting(false);
                      },
                    );
                  }
                }}
              >
                {({ isSubmitting, status }) => (
                  <>
                    {status && status.error ? (
                      <div className="alert alert-danger" role="alert">
                        {status.error}
                      </div>
                    ) : (
                      ''
                    )}
                    <Form className="form-signin">
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

                      <div className="custom-control custom-checkbox mb-3">
                        <Field
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember password
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </button>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
