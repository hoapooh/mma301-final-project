import { IProduct } from './product-interface';

export interface ICartItem {
  id: string;
  product: IProduct;
  quantity: number;
  title: string;
  thumbnail: string;
}

export interface ICart {
  id: string;
  customer_id: number;
  total: number;
  items: ICartItem[];
}
