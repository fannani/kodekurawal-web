import gql from 'graphql-tag';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

export const GET_ACHIEVEMENTS = gql`
  query getAchievements($player: ID!) {
    achievements(player: $player) {
      _id
      title
      caption
      star
      point
      target_point
    }
  }
`;

export const GET_ALL_ACHIEVEMENTS = gql`
  {
    achievements {
      _id
      title
      continuous
      detail {
        _id
        target_point
      }
    }
  }
`;
export const GET_ACHIEVEMENT = gql`
  query getAchievement($id: ID!) {
    achievements(_id: $id) {
      _id
      title
      continuous
      detail {
        _id
        target_point
        caption
        star
      }
    }
  }
`;

export const ADD_DETAIL_ACHIEVEMENT = gql`
  mutation addDetailAchievement(
    $achievement: ID!
    $star: Int!
    $caption: String!
    $target_point: Int!
  ) {
    addDetailAchievement(
      achievement: $achievement
      star: $star
      caption: $caption
      target_point: $target_point
    ) {
      _id
    }
  }
`;

export const ADD_ACHIEVEMENT = gql`
  mutation addAchievement($title: String!, $continuous: Boolean!) {
    addAchievement(title: $title, continuous: $continuous) {
      _id
    }
  }
`;
