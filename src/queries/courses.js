import gql from 'graphql-tag';

export const GET_COURSES = gql`
  {
    courses {
      _id
      name
      imageid
    }
  }
`;

export const GET_COURSE_BYID = gql`
  query GetCourseByID($courseid: ID!) {
    courses(_id: $courseid) {
      _id
      name
      badge {
        title
        _id
        imageid
      }
      desc
      script
      imageid
      stages {
        _id
        title
        time
        teory
        imageid
        index
      }
      leaderboard {
        _id
        score
        player {
          _id
          user {
            name
          }
        }
      }
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse($file: Upload, $name: String!, $desc: String!) {
    addCourse(file: $file, name: $name, desc: $desc) {
      _id
      name
      desc
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($id: ID!, $name: String, $desc: String) {
    updateCourse(id: $id, name: $name, desc: $desc) {
      _id
      name
      desc
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      _id
    }
  }
`;

export const ADD_SCORE = gql`
  mutation addScore(
    $player: ID!
    $course: ID!
    $stage: ID!
    $score: Int!
    $time: Int!
    $stars: [Boolean]!
    $script: String!
  ) {
    addScore(
      player: $player
      course: $course
      stage: $stage
      score: $score
      time: $time
      stars: $stars
      script: $script
    ) {
      _id
      score
      player {
        stars
        achievements {
          _id
          title
          caption
          star
          point
          target_point
        }
        badges {
          _id
          title
          imageid
        }
        course {
          _id
          name
          desc
          imageid
          leaderboard {
            _id
            score
            player {
              _id
              user {
                name
              }
            }
          }
        }
      }
      stages {
        _id
        title
        time
        teory
        win
        score
        stars
        imageid
        course {
          _id
        }
      }
    }
  }
`;
