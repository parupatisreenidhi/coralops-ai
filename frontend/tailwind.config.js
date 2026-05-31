/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CoralOps dark palette
        canvas: "#090c10",
        surface: "#0e1117",
        "surface-1": "#141820",
        "surface-2": "#1a1f2e",
        "surface-3": "#1e2535",
        border: "#1e2535",
        "border-2": "#2a3144",
        coral: "#ff6b47",
        "coral-dim": "#c4421f",
        "coral-glow": "rgba(255,107,71,0.12)",
        accent: "#3b82f6",
        "accent-dim": "#1d4ed8",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        "text-primary": "#f0f4ff",
        "text-secondary": "#8b98b8",
        "text-muted": "#4a5568",
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        display: ["'Syne'", "'DM Sans'", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
