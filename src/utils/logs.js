import axios from 'axios';
import { BASE_URL } from "../config/config";

export function postLog(category, activity, value) {
  axios
    .post(`${BASE_URL}api/logs`, {
      category,
      activity,
      value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
