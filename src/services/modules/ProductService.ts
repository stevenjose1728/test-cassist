import {axios} from 'utils';
import {AxiosResponse, AxiosError} from 'axios'
import {Product } from 'models';
const END_POINT = 'products'
class ProductService {

  static get = (): Promise<Product[]> => {
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
    ProductService
};
