import gql from 'graphql-tag';

export const ADD_AVATAR = gql`
  mutation addAvatar($image: Upload, $title: String!, $min_exp: Int!) {
    addAvatar(title: $title, min_exp: $min_exp, image: $image) {
      _id
      title
      imageid
    }
  }
`;

export const GET_AVATARS = gql`
  {
    avatars {
      _id
      title
      min_exp
    }
  }
`;
