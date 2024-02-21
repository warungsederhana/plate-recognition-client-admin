// import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        neutrals: {
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        primary: {
          100: "#B5C8D4",
          200: "#91ADC0",
          300: "#5E87A3",
          400: "#3F7091",
          500: "#0F4C75",
          600: "#0E456A",
          700: "#0B3653",
          800: "#082A40",
          900: "#062031",
        },
        success: {
          100: "#D1F8CB",
          200: "#9BF19A",
          300: "#62D76E",
          400: "#38B04F",
          500: "#0C7B2C",
          600: "#086A2F",
          700: "#06592F",
          800: "#02472A",
          900: "#023B28",
        },
        info: {
          100: "#C7F9FA",
          200: "#94ECF6",
          300: "#5BCEE3",
          400: "#32A7CA",
          500: "#0177A9",
          600: "#005B90",
          700: "#014478",
          800: "#003061",
          900: "#012350",
        },
        warning: {
          100: "#FDF0CD",
          200: "#FADF9A",
          300: "#F2C367",
          400: "#E6A841",
          500: "#D6810A",
          600: "#B96608",
          700: "#9B4F04",
          800: "#7B3A02",
          900: "#662B01",
        },
        danger: {
          100: "#FBDFD1",
          200: "#F7B9A4",
          300: "#E98671",
          400: "#D2584D",
          500: "#B51B1B",
          600: "#9B131F",
          700: "#820D20",
          800: "#680921",
          900: "#550520",
        },
        base: {
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Make sure Poppins is imported in your project
      },
      fontSize: {
        overline: ["10px", { lineHeight: "normal" }], // Adjust line-height as needed
        caption: ["12px", { lineHeight: "normal" }],
        body2: ["14px", { lineHeight: "normal" }],
        body1: ["16px", { lineHeight: "normal" }],
        subtitle2: ["18px", { lineHeight: "normal" }],
        subtitle1: ["20px", { lineHeight: "normal" }],
        header6: ["24px", { lineHeight: "normal" }],
        header5: ["30px", { lineHeight: "normal" }],
        header4: ["36px", { lineHeight: "normal" }],
        header3: ["48px", { lineHeight: "normal" }],
        header2: ["60px", { lineHeight: "normal" }],
        header1: ["72px", { lineHeight: "normal" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
});
// export default config;
