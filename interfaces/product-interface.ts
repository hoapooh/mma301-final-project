export interface IProductImage {
  id: string;
  url: string;
  rank: number;
}

export interface IProductVariantOption {
  id: string;
  value: string;
  option_id: string;
}

export interface IProductVariant {
  calculated_price: {
    original_amount: number;
  };
  title: string;
  id: string;
  options: IProductVariantOption[];
}

export interface IProductOption {
  id: string;
  title: string;
  values: {
    id: string;
    value: string;
  }[];
}

export interface IProduct {
  id: string;
  title: string;
  status: string;
  thumbnail: string;
  images: IProductImage[];
  collection_id: string;
  type_id: string;
  subtitle: string;
  options: IProductOption[];
  variants: IProductVariant[];
  description: string;
}
