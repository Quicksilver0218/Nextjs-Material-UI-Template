"use client";

import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useColorScheme } from "@mui/material/styles";

export default function ThemeRadio() {
  const { mode, setMode } = useColorScheme();
  if (!mode)
    return null;
  return (
    <FormControl>
      <FormLabel>Theme</FormLabel>
      <RadioGroup
        row
        value={mode}
        onChange={(event) =>
          setMode(event.target.value as "system" | "light" | "dark")
        }
      >
        <FormControlLabel value="system" control={<Radio />} label="System" />
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
      </RadioGroup>
    </FormControl>
  );
};