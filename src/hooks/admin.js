import { useContext } from 'react';
import AppContext from '../utils/context';
import UserService from '../services/UserService';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_REQUEST} from '../data/admin/types';

const useAdmin = () => {
  const [state, dispatch] = useContext(AppContext);

  const login = (email, password) => {
    const request = () => ({ type: LOGIN_REQUEST });
    const success = (user, isLogin) => ({
      type: LOGIN_SUCCESS,
      user,
      isLogin,
    });
    dispatch(request());
    return UserService.login(email, password, 'admin').then(user => {
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

  return {
    login,
    logout,
    isLogin: state.isLogin && state.user.role === 'admin',
    user: state.user,
  };
};

export default useAdmin;
