export interface ProductImage {
  id: string;
  url: string;
}
export interface Variant {
  calculated_price:{
    original_price: string
  }
}
export interface IProduct {
  title: string;
  status: string;
  thumbnail: string;
  images: ProductImage;
  collection_id: string;
  type_id: string;
  subtitle: string;
}

