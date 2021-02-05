import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import { UserAuth } from 'models';

type UserLogin = {
    email:string,
    password:string
}


class LoginService {
  static login = (formData:UserLogin):Promise<UserAuth> => {
    return new Promise((resolve, reject) => {
        axios
        .post(`authentication/login`, formData)
        .then(
          (response: AxiosResponse) =>
            resolve(response.data),
          (error: AxiosError) =>
            reject(error)
        );
    });
  };
}

export {
    LoginService
};
