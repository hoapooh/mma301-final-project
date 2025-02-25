/* import { AuthSlice, createAuthSlice } from '@/features/Auth/authSlice';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppStore = AuthSlice;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SliceInterface<T>
  extends StateCreator<AppStore, [['zustand/devtools', never]], [], T> {}

const useAppStore = create<AppStore>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  }))
);
export default useAppStore;
 */
