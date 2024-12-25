"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  defaultColorScheme: "dark",
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          marginTop: "1.1em",
        },
        h2: {
          marginTop: "1.05em",
        },
        h3: {
          marginTop: "1em",
        },
        h4: {
          marginTop: ".95em",
        },
        h5: {
          marginTop: ".9em",
        },
        h6: {
          marginTop: ".85em",
        },
        body1: {
          marginTop: ".8em",
        },
      }
    },
  },
});

export default theme;
