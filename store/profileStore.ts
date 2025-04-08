import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';


export interface ProfileState {
  profile: any;
  setProfile: (newProfile: any) => void;
  updateProfile: (newProfile: any) => void;
  clearProfile: () => void;
}

const userStorage = {
  getItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};

export const useProfileStore = create<ProfileState>()(persist((set) => ({
  profile: {},
  setProfile: (newProfile) => set(()=>({profile:newProfile})),
  updateProfile: (newProfile) => set((state) => ({profile: {...state.profile, ...newProfile}})),
  clearProfile: () => set(()=>({profile:{}})),
}),{  
  name: 'user-profile',
  storage: createJSONStorage(()=>userStorage),
}));
