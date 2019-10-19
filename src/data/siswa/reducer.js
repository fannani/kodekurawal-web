import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RESET_TIMER,
  SET_PLAY_MODE,
  SET_PLAYER_STATUS,
  UPDATE_TIMER,
  ADD_ENERGY_SUCCESS,
  ADD_EXP_SUCCESS,
  UPDATE_STARS,
  SET_TUTORIAL_SUCCESS,
} from './types';

export const initialState = {
  isLogin: false,
  user: { userdetail: { energy: 0 } },
  gameplay: {
    currentTimer: 0,
    life: 0,
    score: 0,
    timerText: '00:00',
    play: false,
  },
};
export const reducer = (state, action) => {
  const { gameplay } = state;
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: action.isLogin,
        user: action.user,
      };
    case UPDATE_TIMER:
      let sec = gameplay.currentTimer;
      let min = 0;
      let secStr;
      let minStr;
      if (sec > 59) {
        min = Math.floor(sec / 60);
        sec %= 60;
      }
      if (sec < 10) {
        secStr = `0${sec}`;
      } else {
        secStr = sec;
      }
      if (min < 10) {
        minStr = `0${min}`;
      } else {
        minStr = min;
      }

      return {
        ...state,
        gameplay: {
          ...gameplay,
          currentTimer: gameplay.currentTimer + 1,
          timerText: `${minStr}:${secStr}`,
        },
      };
    case RESET_TIMER:
      return {
        ...state,
        gameplay: { ...gameplay, currentTimer: 0, timerText: '00:00' },
      };
    case SET_PLAYER_STATUS:
      return {
        ...state,
        gameplay: { ...gameplay, life: action.life, score: action.score },
      };
    case SET_PLAY_MODE:
      return { ...state, gameplay: { ...gameplay, play: action.play } };

    case ADD_ENERGY_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          userdetail: { ...state.user.userdetail, energy: action.user.energy },
        },
      };
    case UPDATE_STARS:
      return {
        ...state,
        user: {
          ...state.user,
          userdetail: { ...state.user.userdetail, stars: action.stars },
        },
      };
    case ADD_EXP_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          userdetail: {
            ...state.user.userdetail,
            exp: action.user.exp,
            daily_exp: action.user.daily_exp,
            level: action.user.level,
            target_exp: action.user.target_exp,
          },
        },
      };
    case SET_TUTORIAL_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          userdetail: {
            ...state.user.userdetail,
            tutorial: action.user.tutorial,
          },
        },
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
