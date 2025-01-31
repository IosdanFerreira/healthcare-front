import { IUser } from '@/@types';
import { create } from 'zustand';

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>(set => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
  clearUser: () => set({ user: null }),
}));
