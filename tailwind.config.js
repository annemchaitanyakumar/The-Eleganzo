/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F6F2",
        "background-dark": "#183222",
        "background-cream": "#FAF9F6",
        "text-primary": "#111111",
        "text-muted": "#6F6F6F",
        "accent-gold": "#B6955B",
        "accent-gold-light": "#D4C5A0",
        "accent-gold-dark": "#8B7340",
        forest: "#31553B",
        "dark-forest": "#183222",
        overlay: "rgba(10, 10, 11, 0.6)",
        glass: "rgba(247, 246, 242, 0.08)",
        "glass-border": "rgba(182, 149, 91, 0.15)",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "Helvetica Neue", "sans-serif"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.76, 0, 0.24, 1)",
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
}
