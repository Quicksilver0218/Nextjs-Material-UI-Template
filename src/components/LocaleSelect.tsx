"use client";

import { useLocale } from "@/lib/contexts/LocaleProvider";
import useNavigation from "@/lib/hooks/useNavigation";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function LocaleSelect() {
  const locale = useLocale();
  const [urlState, setUrlState] = useNavigation();

  return (
    <FormControl>
      <InputLabel>Language</InputLabel>
      <Select
        size="small"
        MenuProps={{ disableScrollLock: true }}
        style={{ minWidth: 120 }}
        value={locale}
        onChange={e => setUrlState({ pathname: "/" + e.target.value + urlState.pathname.slice(locale.length + 1) })}
      >
        <MenuItem value="zh">繁體中文</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};