import { createSettingSlice, SettingSlice } from '@/features/settingSlice';
// import { AuthSlice, createAuthSlice } from '@/features/Auth/authSlice';

import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppStore = SettingSlice;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SliceInterface<T>
  extends StateCreator<AppStore, [['zustand/devtools', never]], [], T> {}

const useAppStore = create<AppStore>()(
  devtools((...a) => ({
    ...createSettingSlice(...a),
  }))
);
export default useAppStore;
