import axios from 'axios';
import { BASE_URL } from '../config/config';
import APIService from './APIService';

const getUserDetail = async function(user) {
  let query;
  if (user.role === 'siswa') {
    query = `players(_id:"${
      user.userdetailid
    }"){_id,energy,stars,exp,level,target_exp, daily_exp,tutorial}`;
  }
  const result = await APIService.query(query);
  return Object.assign(user, {
    userdetail: result.data.data.players[0],
  });
};

const login = (email, password, role) =>
  axios({
    url: `${BASE_URL}auth/login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .then(async response => {
      if (response.data.user && response.data.user.role === role) {
        if (response.data.user.role === 'siswa') {
          const { user } = response.data;
          const detail = await getUserDetail(user);
          return detail;
        }
        return response.data.user;
      }
      throw Error('Email atau Password salah');
    })
    .then(userdetail => userdetail);

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
};
