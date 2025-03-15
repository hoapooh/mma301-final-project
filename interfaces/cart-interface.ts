import { IProduct } from './product-interface';

export interface ICartItem {
  id: string;
  quantity: number;
  variant_title: string;
  product_title: string;
  thumbnail: string;
  unit_price: number;
}

export interface ICart {
  id: string;
  customer_id: number;
  total: number;
  items: ICartItem[];
}
