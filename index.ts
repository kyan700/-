import create from 'zustand';

type ThemeState = { theme: 'light' | 'dark', setTheme: (t: 'light' | 'dark') => void; };
export const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  setTheme: (t) => set({ theme: t }),
}));
