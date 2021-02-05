import axios from 'axios';
import {store} from 'store'
const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL;

let _axios = axios.create({
  baseURL: baseURL
});

_axios.interceptors.request.use(
  (config) => {
    const { user } = store.getState();
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*function createFormData(data:any) {
  var formdata = new FormData();
  for (var key in data) {
      formdata.append(key, data[key]);
  }
  return formdata;
}*/

export default _axios;
