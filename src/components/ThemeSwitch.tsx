"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Grid, Switch } from "@mui/material";

import useColorScheme from "@/lib/hooks/useColorScheme";

export default function ThemeSwitch() {
  const [mode, setMode] = useColorScheme();
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <LightModeIcon />
      <Switch checked={mode === "dark"} onChange={() => setMode(mode === "dark" ? "light" : "dark")} />
      <DarkModeIcon />
    </Grid>
  );
}