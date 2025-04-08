import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';


export interface SessionState {
  session: string;
  setSession: (newSession: string) => void;
  clearSession: () => void;
}

const authStorage = {
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

export const useSessionStore = create<SessionState>()(persist((set) => ({
  session: '',
  setSession: (newSession) => set(()=>({session:newSession})),
  clearSession: () => set(()=>({session:''})),
}),{
  name: 'auth-session',
  storage: createJSONStorage(()=>authStorage),
}));
