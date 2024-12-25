"use client";

import { useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Code({ children }: PropsWithChildren<object>) {
    const theme = useTheme();
    return <code style={{ color: theme.palette.warning.main }}>{children}</code>;
}