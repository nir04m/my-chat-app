import {create } from 'zustand';

export interface ThemeStore {
  theme: string;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem('theme') || 'light', // Default to 'light' if no theme is set
    setTheme: (theme: string) => {
        localStorage.setItem('chat-theme', theme);
        set({ theme });
    },
}));