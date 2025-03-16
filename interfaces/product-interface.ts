export interface ProductImage {
  id: string;
  url: string;
  rank: number;
}
export interface Variant {
  calculated_price: {
    original_amount: number;
  };
}
export interface IProduct {
  id: string;
  title: string;
  status: string;
  thumbnail: string;
  images: ProductImage[];
  collection_id: string;
  type_id: string;
  subtitle: string;
  variants: Variant[];
}
