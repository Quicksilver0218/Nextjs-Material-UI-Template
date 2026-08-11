import { CSSProperties } from "react";

import { Button, ButtonProps } from "@mui/material";

export default function SharpCornersButton(
  {
    sx, leftCornersSharp, rightCornersSharp, children, ...rest
  }: React.PropsWithChildren<
    ButtonProps & { leftCornersSharp?: boolean; rightCornersSharp?: boolean; }
  >
) {
  const s: CSSProperties = { boxShadow: "none" };
  if (leftCornersSharp) {
    s.borderTopLeftRadius = 0;
    s.borderBottomLeftRadius = 0;
  }
  if (rightCornersSharp) {
    s.borderTopRightRadius = 0;
    s.borderBottomRightRadius = 0;
  }
  return <Button sx={{ ...s, ...sx }} {...rest}>{children}</Button>;
};