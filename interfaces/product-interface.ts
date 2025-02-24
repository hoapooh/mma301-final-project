export interface ProductImage {
  id: string;
  url: string;
}

export interface IProduct {
  tittle: string;
  status: string;
  thumbnail: string;
  images: ProductImage;
  collection_id: string;
  type_id: string;
}
