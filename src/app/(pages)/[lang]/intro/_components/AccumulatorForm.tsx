"use client";

import { useStore } from "@/lib/contexts/StateProvider";
import * as Accumulator from "@/lib/state/action/accumulator";
import { Box, Button, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function AccumulatorForm() {
  const { state, dispatch } = useStore();
  const [num, setNum] = useState("");
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body1" gutterBottom>
        Accumulator: {state.accumulator}
        <br />
        Change Count: {state.changeCount}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid size={{xs: "auto"}}>
            <FormControl sx={{ width: 120 }}>
              <OutlinedInput type="number" size="small" value={num} onChange={e => setNum(e.target.value)} placeholder="Number" />
            </FormControl>
          </Grid>
          <Grid size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="primary" onClick={() => dispatch(Accumulator.Set(num ? Number(num) : 0))}>
              Set
            </Button>
          </Grid>
          <Grid size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="success" onClick={() => dispatch({ type: Accumulator.ActionType.INCREMENT })}>
              +
            </Button>{" "}
          </Grid>
          <Grid size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="error" onClick={() => dispatch({ type: Accumulator.ActionType.DECREMENT })}>
              -
            </Button>{" "}
          </Grid>
          <Grid size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="warning" onClick={() => dispatch({ type: Accumulator.ActionType.RESET })}>
              Reset All
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};