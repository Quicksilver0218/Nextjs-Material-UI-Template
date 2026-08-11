"use client";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useColorScheme from "@/lib/hooks/useColorScheme";
import { Switch } from "@mui/material";

export default function ThemeSwitch() {
  const [mode, setMode] = useColorScheme();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LightModeIcon />
      <Switch checked={mode === "dark"} onChange={() => setMode(mode === "dark" ? "light" : "dark")} />
      <DarkModeIcon />
    </div>
  );
}