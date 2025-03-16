import { SliceInterface } from '@/configs/store';
import { create } from 'zustand';

export interface SettingSlice {
  regionID: string | null;
  setRegion: (region_id: string) => Promise<void>;
}

export const createSettingSlice: SliceInterface<SettingSlice> = (set) => {
  return {
    regionID: null,
    setRegion: async (regionID: string) => {
      set({ regionID });
    },
  };
};
