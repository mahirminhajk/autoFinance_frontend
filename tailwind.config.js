/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // TODO: Change the colors
      colors: {
        primary: "#5465FF",
        secondary: "#788BFF",
        accent: "#707088",
        accent2: "#5F41B2",
        accent3: "#E2FDFF",
        accent4: "#EBEEF2",
        accent5: "#D9D9D9",
        accent6: "#",
      },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Roboto Slab", "serif"],
      body: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
});
