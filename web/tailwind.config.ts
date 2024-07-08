import { withShurikenUI } from "@shuriken-ui/tailwind";
import colors from "tailwindcss/colors";

const danube = {
  "50": "#f2f7fc",
  "100": "#e1eef8",
  "200": "#cae1f3",
  "300": "#a5ceeb",
  "400": "#7ab4e0",
  "500": "#5b98d6",
  "600": "#477fc9",
  "700": "#3d6bb8",
  DEFAULT: "#304b78",
  "900": "#304b78",
  "950": "#21304a",
};

export default withShurikenUI({
  content: [
    "./app.vue",
    "./pages/**/*.{js,ts,vue}",
    "./features/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      // primary: danube,

      colors: {
        danube,
        primary: danube,
        "primary-invert": colors.white,
        // primary: colors.indigo,
        // muted: colors.slate,
        // info: colors.sky,
        // success: colors.teal,
        // warning: colors.amber,
        // danger: colors.rose,
      },
      nui: {},
    },
  },
});
