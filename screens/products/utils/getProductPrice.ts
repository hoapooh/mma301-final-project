import { IProduct } from '@/interfaces/product-interface';

function getProductPrice(product: IProduct): number {
  return product.variants[0].calculated_price.original_amount;
}

export default getProductPrice;
