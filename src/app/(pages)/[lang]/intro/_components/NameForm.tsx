import { useTranslation } from "@/lib/contexts/TranslationProvider";
import useNavigation from "@/lib/hooks/useNavigation";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useName } from "../_lib/contexts/NameProvider";

function Form({ nameState }: { nameState: [string | undefined] }) {
  const [urlState, setUrlState] = useNavigation();
  const [loading, setLoading] = useState(false);
  const [prevNameState, setPrevNameState] = useState(nameState);

  if (nameState !== prevNameState) {
    setPrevNameState(nameState);
    setLoading(false);
  }

  return (
    <form noValidate autoComplete="off" onSubmit={e => {
      e.preventDefault();
      setUrlState({ searchParams: {
        ...urlState.searchParams,
        name: new FormData(e.target as HTMLFormElement).get("name") as string || undefined
      } });
      setLoading(true);
    }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: "auto" }}>
          <TextField
            size="small"
            type="text"
            name="name"
            placeholder="Your Name"
          />
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Button variant="contained" size="large" type="submit" loading={loading}>Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default function NameForm() {
  const t = useTranslation();
  const nameState = useName();

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Typography variant="subtitle1" color="secondary">
        {t("Hello", { name: nameState[0] ?? t("World") })}
      </Typography>
      <Form nameState={nameState} />
    </Stack>
  );
}