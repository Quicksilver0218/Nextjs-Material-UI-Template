import { useTranslation } from "@/lib/contexts/TranslationProvider";
import useNavigation from "@/lib/hooks/useNavigation";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useName } from "../_lib/contexts/NameProvider";
import useEffectSkipFirst from "@/lib/hooks/useEffectSkipFirst";

export default function NameForm() {
  const t = useTranslation();
  const nameState = useName();
  const [urlState, setUrlState] = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => setLoading(false), [nameState]);
  
  const refresh = useCallback(() => {
    setUrlState({});
    setLoading(true);
  }, [setUrlState]);

  useEffectSkipFirst(() => refresh(), [urlState, refresh]);

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Typography variant="subtitle1" color="secondary">
        {t("Hello", { name: nameState[0] ?? t("World") })}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={e => {
        e.preventDefault();
        setUrlState({ searchParams: {
          ...urlState.searchParams,
          name: new FormData(e.target as HTMLFormElement).get("name") as string || undefined
        } });
        setLoading(true);
      }}>
        <Grid container spacing={2}>
          <Grid size={{xs: "auto"}}>
            <TextField
              size="small"
              type="text"
              name="name"
              placeholder="Your Name"
            />
          </Grid>
          <Grid size={{xs: "auto"}}>
            <Button variant="contained" size="large" type="submit" loading={loading}>Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}