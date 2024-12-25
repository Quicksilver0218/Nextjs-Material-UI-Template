"use client";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleSelect({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname().substring(locale.length + 1);
  return (
    <FormControl>
      <InputLabel>Language</InputLabel>
      <Select
        size="small"
        MenuProps={{ disableScrollLock: true }}
        style={{ minWidth: 120 }}
        value={locale}
        onChange={e => router.push(`/${e.target.value}${pathname}`, { scroll: false })}
      >
        <MenuItem value="zh">繁體中文</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};