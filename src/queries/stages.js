import gql from 'graphql-tag';

export const GET_STAGE_BY_COURSE_PLAYER = gql`
  query GetStageByCoursePlayer($courseid: ID!, $playerid: ID) {
    stages(course: $courseid, player: $playerid) {
      _id
      title
      time
      teory
      win
      score
      type
      stars
      index
      imageid
      course {
        _id
      }
    }
  }
`;

export const GET_STAGE_BY_PLAYER = gql`
  query GetStageByPlayer($id: ID!, $playerid: ID!) {
    stages(_id: $id, player: $playerid) {
      _id
      title
      time
      index
      win
      exp_reward
      teory
      type
      script
      language
      quiz {
        title
        questions {
          content
          questionType 
          choice 
          answer 
          score 
        }
        time
      }
      material {
        body 
        materialType 
        url
      }
      course {
        name
        _id
        stages {
          _id
          index
          title
          type
        }
        badge {
          _id
        }
      }
      missions {
        _id
        quest
        score
        testcase {
          params
          testcase {
            _id
            caption
            script
          }
        }
      }
    }
  }
`;

export const GET_STAGE_BY_ID = gql`
  query GetStageByID($id: ID!) {
    stages(_id: $id) {
      _id
      title
      time
      index
      exp_reward
      teory
      script
      language
      type
      course {
        _id
        stages {
          _id
          index
        }
      }
      missions {
        _id
        quest
        score
        testcase {
          params
          testcase {
            _id
            caption
            script
          }
        }
      }
    }
  }
`;

export const UPDATE_STAGE = gql`
  mutation updateStage(
    $file: Upload
    $title: String!
    $time: Int
    $id: ID!
    $teory: String
    $exp_reward: Int
    $script: String
    $language: String
  ) {
    updateStage(
      file: $file
      title: $title
      time: $time
      id: $id
      teory: $teory
      script: $script
      language: $language
      exp_reward: $exp_reward
    ) {
      _id
      title
      time
      teory
      course {
        _id
      }
    }
  }
`;

export const ADD_STAGE = gql`
  mutation addStage(
    $title: String!
    $teory: String
    $time: Int
    $course: ID!
    $type: StageType!
  ) {
    addStage(
      title: $title
      teory: $teory
      time: $time
      course: $course
      type: $type
    ) {
      _id
      title
      time
      teory
      script
        type
      course {
        _id
      }
    }
  }
`;

export const DELETE_STAGE = gql`
  mutation deleteStage($id: ID!) {
    deleteStage(id: $id) {
      _id
    }
  }
`;

export const REORDER_STAGE = gql`
  mutation reorderStage($courseid: ID!, $source: Int!, $destination: Int!) {
    reorderStage(
      courseid: $courseid
      source: $source
      destination: $destination
    ) {
      _id
    }
  }
`;
