"use client";

import { createTheme } from "@mui/material/styles";
import { roboto } from "./fonts";

export default createTheme({
  colorSchemes: { light: true, dark: true },
  defaultColorScheme: "dark",
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  cssVariables: {
    colorSchemeSelector: "class"
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { component: "h1" },
          style: {
            marginTop: "1.04em",
          },
        },
        {
          props: { component: "h2" },
          style: {
            marginTop: "1em",
          },
        },
        {
          props: { component: "h3" },
          style: {
            marginTop: ".96em",
          },
        },
        {
          props: { component: "h4" },
          style: {
            marginTop: ".92em",
          },
        },
        {
          props: { component: "h5" },
          style: {
            marginTop: ".88em",
          },
        },
        {
          props: { component: "h6" },
          style: {
            marginTop: ".84em",
          },
        },
        {
          props: { component: "p" },
          style: {
            marginTop: ".8em",
          },
        }
      ]
    },
  },
});
