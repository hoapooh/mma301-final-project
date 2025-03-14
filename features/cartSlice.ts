import { SliceInterface } from '@/configs/store';
import { ICart } from '@/interfaces/cart-interface';
import { create } from 'zustand';

export interface CartSlice {
  cart: ICart | null;
  setCart: (c: ICart) => Promise<void>;
}

export const createCartSlice: SliceInterface<CartSlice> = (set) => {
  return {
    cart: null,
    setCart: async (cart: ICart) => {
      set({ cart });
    },
  };
};
