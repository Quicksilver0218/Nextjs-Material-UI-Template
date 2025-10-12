"use client";

import { useTranslation } from "@/lib/contexts/TranslationProvider";
import { Box, Typography, Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import Link from "next/link";

export default function Root() {
  const t = useTranslation();
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <div>
        <Typography variant="h1" align="center" marginTop={0}>{t("PageNotFound")}</Typography>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button LinkComponent={Link} href="/" variant="contained" size="large" startIcon={<Home />} style={{ minWidth: 180 }}>
            {t("BackToHome")}
          </Button>
        </Box>
      </div>
    </Box>
  );
}