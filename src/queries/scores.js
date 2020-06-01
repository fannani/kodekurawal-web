import gql from 'graphql-tag'

export const GET_SCORES = gql`
  {
    scores {
      score
      stars
      time
      stage { 
        title
      }
      player {
        user {
          name
        }
      }
    }
  }
`;