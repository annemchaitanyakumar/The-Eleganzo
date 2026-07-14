import { create } from 'zustand';

const useStore = create((set) => ({
  // Loading state
  // Only show preloader on first-ever visit — sessionStorage persists for the tab session
  isLoading: !sessionStorage.getItem('eleganzo_loaded'),
  setIsLoading: (value) => {
    if (!value) sessionStorage.setItem('eleganzo_loaded', '1');
    set({ isLoading: value });
  },

  // Menu state
  isMenuOpen: false,
  setIsMenuOpen: (value) => set({ isMenuOpen: value }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  // Cursor state
  cursorVariant: 'default',
  cursorText: '',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  setCursorText: (text) => set({ cursorText: text }),
  setCursor: (variant, text = '') => set({ cursorVariant: variant, cursorText: text }),
  resetCursor: () => set({ cursorVariant: 'default', cursorText: '' }),
  // Lenis instance
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}));

export default useStore;
