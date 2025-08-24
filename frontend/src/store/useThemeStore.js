// here our logic is to save the theme in the local storage so that even we have refressed the page then also have applied theme on the application

import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",     // "Coffee" theme as by default
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));