"use client";

import { useColorScheme } from "@mui/material";
import { useColorScheme as useStyleColorScheme } from "@mui/material/styles";

export default function useActiveColorScheme(): ["light" | "dark" | undefined, (mode: "light" | "dark" | "system" | null) => void] {
  const { setMode } = useColorScheme();
  const { mode, systemMode } = useStyleColorScheme();
  const activeMode = mode === "system" ? systemMode : mode;
  return [activeMode, setMode];
}