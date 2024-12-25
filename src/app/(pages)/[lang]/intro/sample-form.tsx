"use client";

import { Box, Button, Grid2, Switch, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useActionState, useState } from "react";
import SampleFormHandler from "./sample-form-handler";
import { LoadingButton } from "@mui/lab";
import { validateForm } from "./sample-form-validator";
import ControlledFileInput from "@/app/components/controlled-file-input";

export default function SampleForm() {
  const [ssv, setSsv] = useState(true);
  const [integer, setInteger] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [serverFailedFields, formAction, pending] = useActionState(SampleFormHandler, new Set());
  const [clientFailedFields, setClientFailedFields] = useState(new Set<string>());
  const failedFields = ssv ? serverFailedFields : clientFailedFields;
  
  return (
    <Box
      sx={{ p: 2 }}
      component="form"
      noValidate
      autoComplete="off"
      method="POST"
      encType="multipart/form-data"
      action={formAction}
      onSubmit={ssv ? undefined : async (e) => {
        e.preventDefault();
        setClientFailedFields(validateForm(new FormData(e.target as HTMLFormElement)));
      }}
    >
      Client-side Validation <Switch checked={ssv} onChange={(e) => setSsv(e.target.checked)} /> Server-side Validation
      <Grid2 container spacing={2}>
        <Grid2 size={{xs: "auto"}}>
          <TextField
            size="small"
            type="text"
            name="integer"
            placeholder="Input an unsigned integer"
            value={integer}
            onChange={(e) => setInteger(e.target.value)}
            error={failedFields.has("integer")}
            helperText={failedFields.has("integer") ? "Please input an unsigned integer." : undefined}
          />
        </Grid2>
        <Grid2 size={{xs: "grow"}}>
          <Grid2 container>
            <Grid2 size={{xs: "auto"}} display="flex" alignItems="stretch">
              <Button
                variant="contained"
                color="secondary"
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<CloudUpload />}
                style={{ maxWidth: 300, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                Choose an image (≤ 1MB)
                <ControlledFileInput
                  name="image"
                  hidden
                  files={files}
                  setFiles={setFiles}
                />
              </Button>
            </Grid2>
            <Grid2 size={{xs: "grow"}}>
              <TextField
                size="small"
                variant="outlined"
                disabled
                fullWidth
                slotProps={{ input: { style: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} }}
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
          <LoadingButton
            size="large"
            variant="contained"
            type="submit"
            loading={pending}
          >
            Submit
          </LoadingButton>
        </Grid2>
      </Grid2>
    </Box>
  );
};