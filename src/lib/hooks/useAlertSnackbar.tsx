"use client";

import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { ReactElement, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SnackbarOptions {
  open?: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
}

export interface AlertOptions extends SnackbarOptions {
  autoHideDuration?: number;
}

export default function useAlertSnackbar(): [(options: AlertOptions) => void, ReactElement] {
  const [options, setOptions] = useState<SnackbarOptions>({ open: false, message: "" });
  const timerRef = useRef<NodeJS.Timeout>(null);

  const onClose = useCallback(() => {
    setOptions(options => ({ open: false, message: options.message, severity: options.severity }));
  }, [setOptions]);

  const onSnackbarClose = useCallback((_: SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason !== "clickaway")
      onClose();
  }, [onClose]);

  const alert = useCallback((options: AlertOptions) => {
    setOptions(options);
    if (timerRef.current)
      clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onClose();
    }, options.autoHideDuration ?? 4000);
  }, [setOptions, onClose]);

  useEffect(() => {
    return () => {
      if (timerRef.current)
        clearTimeout(timerRef.current);
    };
  }, []);

  const component = useMemo(() => 
    <Snackbar
      open={options.open === false ? false : true}
      onClose={onSnackbarClose}
    >
      <Alert severity={options.severity} onClose={onClose}>
        {options.message}
      </Alert>
    </Snackbar>,
    [options, onClose, onSnackbarClose]
  );

  return [alert, component];
}