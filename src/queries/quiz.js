import gql from 'graphql-tag';


export const questionType = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  ESSAY: 'ESSAY',
};

export const GET_QUIZ = gql`
  query getQuiz($stageid : ID!) {
    quiz(where: {stage: $stageid}){
      _id,
      time,
      questions {
        content,
        questionType,
        choice,
        answer
        score
      }
    }
  }
`;


export const UPDATE_QUIZ = gql`
  mutation updateQuiz($id : ID!,   $data: QuizInput!){
    updateQuiz(id: $id, input: $data) {
      _id,
      time,
      questions {
        content,questionType, choice, answer,score
      }
    }
  }
`;
