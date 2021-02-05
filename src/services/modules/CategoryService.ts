import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import {Category } from 'models';
const END_POINT = 'categories'
class CategoryService {

  static get = (): Promise<Category[]> => {
    return new Promise((resolve, reject) => {
      axios
      .get(`${END_POINT}`)
      .then(
        (response: AxiosResponse) =>
          resolve(response.data),
        (error: AxiosError) =>
          reject(error)
      );
    });
  }
}

export {
    CategoryService
};
