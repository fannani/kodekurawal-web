import gql from 'graphql-tag';

export const GET_MISSION_BY_ID = gql`
  query getMissionByID($id: ID!) {
    missions(_id: $id) {
      _id
      quest
      score
      stage {
        language
      }
    }
  }
`;

export const ADD_MISSION = gql`
  mutation addMission($quest: String!, $score: Int!, $stageid: ID!) {
    addMission(quest: $quest, score: $score, stage: $stageid) {
      _id
    }
  }
`;

export const UPDATE_MISSION = gql`
  mutation updateMission($id: ID!, $quest: String, $score: Int) {
    updateMission(id: $id, quest: $quest, score: $score) {
      _id
    }
  }
`;

export const GET_TESTCASE_MISSION = gql`
  query getTestCaseMission($mission: ID!) {
    testcaseMission(mission: $mission) {
      _id
      testcase {
        caption
        script
      }
      params
    }
  }
`;

export const ADD_TESTCASE_MISSION = gql`
  mutation addTestCaseMission(
    $mission: ID!
    $testcase: ID!
    $params: [String]
  ) {
    addTestCaseMission(
      mission: $mission
      testcase: $testcase
      params: $params
    ) {
      _id
      testcase {
        caption
        script
      }
      params
    }
  }
`;
