import gql from 'graphql-tag';

export const GET_PLAYERLEVEL = gql`
  {
    playerlevel {
      _id
      level
      exp_req
    }
  }
`;

export const ADD_PLAYERLEVEL = gql`
  mutation addPlayerLevel($level: Int!, $exp_req: Int!) {
    addPlayerLevel(level: $level, exp_req: $exp_req) {
      _id
      level
      exp_req
    }
  }
`;
