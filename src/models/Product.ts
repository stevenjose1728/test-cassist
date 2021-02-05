import {Category} from './Category'
export type Product = {
    id: number,
    name: string,
    price: string,
    available: boolean,
    best_seller: boolean,
    categories: Array<number | Category>,
    img: string,
    description: string
}