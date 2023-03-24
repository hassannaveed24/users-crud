/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const scrollbar = require("tailwind-scrollbar");

const slate = {
  1: "#1E293B",
  4: "#64748B",
  7: "#E2E8F0",
};

module.exports = {
  content: ["./src/**/*"],
  theme: {
    outlineColor: "#0F172A",
    ringColor: "#0F172A",
    extend: {
      screens: {
        "1100px": "1100px",
      },
      shadow: {
        sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
      },
      colors: {
        primary: {
          DEFAULT: slate[1],
        },
        textColors: {
          1: slate[1],
          2: "#1F2933", // grey-1
          3: "#616E7C", // grey-5
          red: {
            DEFAULT: "#C52707", // orange-3
          },
          sky: {
            DEFAULT: "#0EA5E9", // sky-4.2
          },
          indigo: {
            DEFAULT: "#6366F1", // indigo-4
          },
          yellow: {
            DEFAULT: "#F0B429", // yellow-5
          },
          green: {
            DEFAULT: "#22C55E", // green-4
          },
        },
        borderColors: {
          1: slate[7], // slate-7
          2: "#E4E7EB", // grey-9
        },
        backgroundColors: {
          neutral: {
            1: "#E4E7EB", // grey-9
            2: "#F5F7FA", // grey-10
          },
          red: {
            DEFAULT: "#FFE3E3", // red-10
          },
          sky: {
            DEFAULT: "#F0F9FF", // sky-9
          },
          indigo: {
            DEFAULT: "#EEF2FF", // indigo-9
          },
        },
        orange: { 3: "#C52707" },
        red: {
          10: "#FFE3E3",
        },
        blue: {
          1: "#1E293B",
          7: "#47A3F3",
          9: "#BAE3FF",
          10: "#E6F6FF",
        },
        grey: {
          3: "#3E4C59",
          5: "#616E7C",
          7: "#9AA5B1",
          8: "#CBD2D9",
          9: "#E4E7EB",
          10: "#F5F7FA",
        },
        purple: {
          5: "#8719E0",
          10: "#F2EBFE",
        },
        brand: {
          DEFAULT: "#0F172A", // slate-900
          light: "#475569", // slate-600
          dark: "black", // stone-900
        },
        slate,
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  safelist: ['z-[50]'],
  plugins: [require("@tailwindcss/forms"), scrollbar({ nocompatible: true })],
};
