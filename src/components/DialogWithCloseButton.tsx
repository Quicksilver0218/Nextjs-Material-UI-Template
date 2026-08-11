"use client";

import { PropsWithChildren, ReactElement } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Divider, Grid, IconButton } from "@mui/material";

export default function DialogWithCloseButton({
  title,
  actions,
  children,
  ...props
}: PropsWithChildren<DialogProps & { title?: string, actions?: ReactElement }>) {
  return (
    <Dialog {...props}>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <DialogTitle component="div">{title}</DialogTitle>
        <Box sx={{ p: 1 }}>
          <IconButton
            aria-label="close"
            onClick={e => props.onClose?.(e, "escapeKeyDown")}
            sx={theme => ({
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Grid>
      <Divider />
      <DialogContent>{children}</DialogContent>
      {actions &&
        <DialogActions>
          {actions}
        </DialogActions>
      }
    </Dialog>
  );
}