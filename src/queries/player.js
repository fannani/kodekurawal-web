import gql from 'graphql-tag';

export const GET_COURSE_BY_PLAYER = gql`
  query GetCourseByPlayer($playerid: ID!) {
    players(_id: $playerid) {
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
  }
`;

export const GET_PLAYER_DATA = gql`
  query GetPlayerData($player: ID!) {
    players(_id: $player) {
      achievement_total
      badges {
        _id
      }
      avatars {
        _id
        imageid
        unlock
      }

      avatar {
        imageid
      }
    }
  }
`;

export const GET_PLAYER_ACHIEVEMENTS = gql`
  query GetPlayerAchievements($player: ID!) {
    players(_id: $player) {
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
    }
  }
`;

export const ADD_BADGE_PLAYER = gql`
  mutation addBadgePlayer($id: ID!, $badge: ID!) {
    addBadgePlayer(id: $id, badge: $badge) {
      _id
      badges {
        _id
      }
    }
  }
`;

