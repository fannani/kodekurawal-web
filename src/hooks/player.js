import { useContext } from 'react';
import AppContext from '../utils/context';
import UserService from '../services/UserService';
import PlayerService from '../services/PlayerService';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  ADD_ENERGY_FAILURE,
  ADD_ENERGY_REQUEST,
  ADD_ENERGY_SUCCESS,
  ADD_EXP_FAILURE,
  ADD_EXP_REQUEST,
  ADD_EXP_SUCCESS,
  ADD_BADGE_FAILURE,
  ADD_BADGE_REQUEST,
  ADD_BADGE_SUCCESS,
  GIVE_ACHIEV_REQUEST,
  GIVE_ACHIEV_FAILURE,
  GIVE_ACHIEV_SUCCESS,
  SET_TUTORIAL_FAILURE,
  SET_TUTORIAL_SUCCESS,
  SET_TUTORIAL_REQUEST,
  UPDATE_STARS,
} from '../data/siswa/types';
import {
  setPlayerStatus,
  setPlayMode,
  updateTimer,
  resetTimer,
} from '../data/siswa/actions';
import { toast } from 'react-toastify';

const usePlayer = () => {
  const [state, dispatch] = useContext(AppContext);

  const login = (email, password) => {
    const request = () => ({ type: LOGIN_REQUEST });
    const success = (user, isLogin) => ({
      type: LOGIN_SUCCESS,
      user,
      isLogin,
    });

    dispatch(request());
    return UserService.login(email, password, 'siswa').then(user => {
      let isLogin = false;
      if (user) {
        isLogin = true;
      }
      dispatch(success(user, isLogin));
      return user;
    });
  };

  const logout = () => {
    const request = () => ({ type: LOGOUT_REQUEST });
    const success = () => ({ type: LOGOUT_SUCCESS });
    dispatch(request());
    UserService.logout();
    dispatch(success());
  };

  const setTutorial = (tutorial, index) => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: SET_TUTORIAL_REQUEST });
    const success = user => ({ type: SET_TUTORIAL_SUCCESS, user });
    const failure = error => ({ type: SET_TUTORIAL_FAILURE, error });
    dispatch(request());
    return PlayerService.setTutorial(userid, tutorial, index).then(
      player => {
        dispatch(success(player));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  const addEnergy = energy => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: ADD_ENERGY_REQUEST });
    const success = user => ({ type: ADD_ENERGY_SUCCESS, user });
    const failure = error => ({ type: ADD_ENERGY_FAILURE, error });
    dispatch(request());
    return PlayerService.addEnergy(userid, energy).then(
      player => {
        dispatch(success(player));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  const addBadge = badge => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: ADD_BADGE_REQUEST });
    const success = user => ({ type: ADD_BADGE_SUCCESS, user });
    const failure = error => ({ type: ADD_BADGE_FAILURE, error });
    dispatch(request());
    return PlayerService.addBadge(userid, badge).then(
      player => {
        dispatch(success(player));
        toast.success(`Selamat Kamu Mendapatkan Badge`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  const giveAchievement = achievement => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: GIVE_ACHIEV_REQUEST });
    const success = achiev => ({ type: GIVE_ACHIEV_SUCCESS, achiev });
    const failure = error => ({ type: GIVE_ACHIEV_FAILURE, error });
    dispatch(request());
    return PlayerService.giveAchievement(userid, achievement).then(
      player => {
        dispatch(success(player));
        toast.success(`Selamat Kamu Mendapatkan Achievement`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  const addExp = exp => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: ADD_EXP_REQUEST });
    const success = user => ({ type: ADD_EXP_SUCCESS, user });
    const failure = error => ({ type: ADD_EXP_FAILURE, error });
    dispatch(request());
    PlayerService.addExp(userid, exp).then(
      player => {
        dispatch(success(player));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  const changeAvatar = avatar => {
    const userid = state.user.userdetail._id;
    return PlayerService.changeAvatar(userid, avatar._id).then(
      player => player,
      error => error,
    );
  };

  return {
    login,
    logout,
    addEnergy,
    addExp,
    addBadge,
    giveAchievement,
    changeAvatar,
    setTutorial,
    isLogin: state.isLogin && state.user.role === 'siswa',
    user: state.user,
    incrementTimer: () => {
      dispatch(updateTimer());
    },
    gameplay: state.gameplay,
    resetTimer: () => {
      dispatch(resetTimer());
    },
    setPlayerStatus: (score, life) => {
      dispatch(setPlayerStatus(score, life));
    },
    setPlayMode: play => {
      dispatch(setPlayMode(play));
    },
    updateStars: stars => {
      dispatch({ type: UPDATE_STARS, stars });
    },
  };
};

export default usePlayer;
