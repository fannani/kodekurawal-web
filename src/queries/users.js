import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password, role: USER) {
      tokens {
        refreshToken
        accessToken
      }
      user {
        email
        name
        role
      }
    }
  }
`;


export const SIGNIN_ADMIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      tokens {
        refreshToken
        accessToken
      }
      user {
        email
        name
        role
      }
    }
  }
`
export const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      tokens {
        refreshToken
        accessToken
      }
      user {
        email
        name
        role
        player {
          _id
          energy
          stars
          exp
          level
          target_exp
          daily_exp
          tutorial
        }
      }
    }
  }
`;
