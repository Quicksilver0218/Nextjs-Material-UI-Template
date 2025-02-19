"use client";

import { Box, Button, Grid2, Switch, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useActionState, useEffect, useState } from "react";
import SampleFormHandler from "../_lib/sample-form-handler";
import { validateForm } from "../_lib/sample-form-validator";
import ControlledFileInput from "@/components/ControlledFileInput";
import SharpCornersButton from "@/components/SharpCornersButton";
import SharpCornersOutlinedInput from "@/components/SharpCornersOutlinedInput";

export default function SampleForm() {
  const [ssv, setSsv] = useState(true);
  const [integer, setInteger] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [serverFailedFields, formAction, pending] = useActionState(SampleFormHandler, new Set());
  const [failedFields, setFailedFields] = useState(new Set());

  useEffect(() => {
    setFailedFields(serverFailedFields);
  }, [serverFailedFields]);
  
  return (
    <Box
      sx={{ p: 2 }}
      component="form"
      noValidate
      autoComplete="off"
      action={formAction}
      onSubmit={ssv ? undefined : e => {
        e.preventDefault();
        setFailedFields(validateForm(new FormData(e.target as HTMLFormElement)));
      }}
    >
      Client-side Validation
      <Switch checked={ssv} onChange={e => { setSsv(e.target.checked); setFailedFields(new Set()); }} />
      Server-side Validation
      <Grid2 container spacing={2}>
        <Grid2 size={{xs: "auto"}}>
          <TextField
            size="small"
            type="text"
            name="integer"
            placeholder="Input an unsigned integer"
            value={integer}
            onChange={e => setInteger(e.target.value)}
            error={failedFields.has("integer")}
            helperText={failedFields.has("integer") ? "Please input an unsigned integer." : undefined}
          />
        </Grid2>
        <Grid2 size={{xs: "grow"}}>
          <Grid2 container>
            <Grid2 size={{xs: "auto"}} display="flex" alignItems="stretch">
              <SharpCornersButton
                variant="contained"
                color="secondary"
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<CloudUpload />}
                rightCornersSharp
                style={{ maxWidth: 300 }}
              >
                Choose an image (≤ 1MB)
                <ControlledFileInput
                  name="image"
                  hidden
                  files={files}
                  setFiles={setFiles}
                />
              </SharpCornersButton>
            </Grid2>
            <Grid2 size={{xs: "grow"}}>
              <SharpCornersOutlinedInput
                size="small"
                disabled
                fullWidth
                leftCornersSharp
                placeholder="(No file selected)"
                value={files.length > 0 ? files[0].name : ""}
                error={failedFields.has("imageSize") || failedFields.has("imageType")}
              />
            </Grid2>
          </Grid2>
          <div>
            <Typography variant="caption" color="error">
              {failedFields.has("imageSize") ? "File size must be ≤ 1MB." : failedFields.has("imageType")? "Please choose an image file." : undefined}
            </Typography>
          </div>
        </Grid2>
        <Grid2 size={{xs: "auto"}}>
          <Button
            variant="contained"
            type="submit"
            loading={pending}
            style={{ height: 40 }}
          >
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};