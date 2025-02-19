import { OutlinedInput, OutlinedInputProps } from "@mui/material";

export default function SharpCornersOutlinedInput(
  {
    style, leftCornersSharp, rightCornersSharp, ...rest
  }: OutlinedInputProps & { leftCornersSharp?: boolean; rightCornersSharp?: boolean; }
) {
  const s = { ...style };
  if (leftCornersSharp) {
    s.borderTopLeftRadius = 0;
    s.borderBottomLeftRadius = 0;
  }
  if (rightCornersSharp) {
    s.borderTopRightRadius = 0;
    s.borderBottomRightRadius = 0;
  }
  return <OutlinedInput style={s} {...rest} />;
};