import gql from 'graphql-tag';

export const UPDATE_BADGE = gql`
  mutation updateBadge($id: ID, $title: String, $image: Upload, $course: ID) {
    updateBadge(id: $id, title: $title, image: $image, course: $course) {
      _id
      title
      imageid
    }
  }
`;
