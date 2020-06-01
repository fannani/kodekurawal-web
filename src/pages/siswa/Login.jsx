import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import usePlayer from '../../hooks/player';
import { SIGNIN } from '../../queries/users';
import Mutation from "react-apollo/Mutation";

const Container = styled.div`
  max-width: 100% !important;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.loginBackground}
`;

const Button = styled.button`
  background-color: ${props => props.theme.primaryColor}
`

const CardSignIn = styled.div`
`

const Login = () => {
  const player = usePlayer();

  if (player.isLogin) {
    return <Redirect push to="/dashboard" />;
  }
  return (
    <Container className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <CardSignIn className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <Mutation mutation={SIGNIN}>
                {signIn => (
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { setSubmitting, setStatus }) => {
                  setStatus(undefined);
                  const { email, password } = values;
                  if (email && password) {
                    signIn({
                      variables : {
                        email, password
                      }
                    }).then(
                      ({data}) => {
                        setSubmitting(false);
                        player.saveTokens(data.signIn.tokens);
                        player.setAuth(data.signIn.user);
                      },
                      () => {
                        setStatus({ error: 'Email atau Password salah' });
                        setSubmitting(false);
                      }
                    )
                    // player.login(email, password).then(
                    //   () => {
                    //     setSubmitting(false);
                    //   },
                    //   () => {
                    //     setStatus({ error: 'Email atau Password salah' });
                    //     setSubmitting(false);
                    //   },
                    // );
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
                      <Button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </Button>
                      <hr className="my-4" />
                      <Link
                        to="register"
                        className="btn btn-lg  btn-block text-uppercase"
                      >
                        Sign Up
                      </Link>

                      {/*<button*/}
                      {/*className="btn btn-lg btn-google btn-block text-uppercase"*/}
                      {/*type="submit"*/}
                      {/*>*/}
                      {/*<i className="fab fa-google mr-2" /> Sign in with Google*/}
                      {/*</button>*/}
                      {/*<button*/}
                      {/*className="btn btn-lg btn-facebook btn-block text-uppercase"*/}
                      {/*type="submit"*/}
                      {/*>*/}
                      {/*<i className="fab fa-facebook-f mr-2" /> Sign in with*/}
                      {/*Facebook*/}
                      {/*</button>*/}
                    </Form>
                  </>
                )}
              </Formik>)}
              </Mutation>
            </div>
          </CardSignIn>
        </div>
      </div>
    </Container>
  );
};

export default Login;
