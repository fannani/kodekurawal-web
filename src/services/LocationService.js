import axios from 'axios';

export const getProvince = () => {
  axios
    .get(`https://kodepos-2d475.firebaseio.com/list_propinsi.json?print=pretty`)
    .then(async response => response.data);
};

export const getCity = code => {
  axios
    .get(
      `https://kodepos-2d475.firebaseio.com/list_kotakab/${code}.json?print=pretty`,
    )
    .then(async response => response.data);
};
