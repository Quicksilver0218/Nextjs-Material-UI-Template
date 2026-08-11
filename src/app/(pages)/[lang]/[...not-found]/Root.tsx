"use client";

import Link from "next/link";

import { Home } from "@mui/icons-material";
import { Typography, Button, Stack } from "@mui/material";

import { useTranslation } from "@/lib/contexts/TranslationProvider";

export default function Root() {
  const t = useTranslation();
  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 2, height: "100vh" }}>
      <Typography variant="h1" align="center">{t("PageNotFound")}</Typography>
      <Button LinkComponent={Link} href="/" variant="contained" size="large" startIcon={<Home />} style={{ minWidth: 180 }}>
        {t("BackToHome")}
      </Button>
    </Stack>
  );
}