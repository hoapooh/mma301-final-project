export interface IOrderList {
  limit: number;
  offset: number;
  count: number;
  orders: IOrder[];
}

export interface IOrder {
  id: number;
  region_id: string;
  customer_id: string;
  email: string;
  currency_code: string;
  items: IOrderItem[];
  payment_status: string;
  item_total: number;
  total: number;
  status: string;
  created_at: string;
}

export interface IOrderItem {
  id: number;
  title: string;
  subtitle: string;
  thumbnail: string;
  product_id: string;
  product_title: string;
  product_type: string;
  quantity: number;
  total: number;
  created_at: string;
}
