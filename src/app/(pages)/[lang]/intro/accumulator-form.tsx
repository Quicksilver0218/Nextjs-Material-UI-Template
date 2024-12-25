"use client";

import * as Accumulator from "@/lib/state/action/accumulator";
import { store } from "@/app/components/state-provider";
import { Box, Button, FormControl, Grid2, OutlinedInput, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function AccumulatorForm() {
  const { state, dispatch } = useContext(store);
  const [num, setNum] = useState('');
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body1" gutterBottom>
        Accumulator: {state.accumulator}
        <br />
        Change Count: {state.changeCount}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid2 container spacing={2}>
          <Grid2 size={{xs: "auto"}}>
            <FormControl sx={{ width: 120 }}>
              <OutlinedInput type="number" size="small" value={num} onChange={e => setNum(e.target.value)} placeholder="Number" />
            </FormControl>
          </Grid2>
          <Grid2 size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="primary" onClick={() => dispatch(Accumulator.Set(num ? Number(num) : 0))}>
              Set
            </Button>
          </Grid2>
          <Grid2 size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="success" onClick={() => dispatch({ type: Accumulator.ActionType.INCREMENT })}>
              +
            </Button>{' '}
          </Grid2>
          <Grid2 size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="error" onClick={() => dispatch({ type: Accumulator.ActionType.DECREMENT })}>
              -
            </Button>{' '}
          </Grid2>
          <Grid2 size={{xs: "auto"}}>
            <Button variant="contained" size="large" color="warning" onClick={() => dispatch({ type: Accumulator.ActionType.RESET })}>
              Reset All
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};