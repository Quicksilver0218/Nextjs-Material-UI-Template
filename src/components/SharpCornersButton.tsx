import { Button, ButtonProps } from "@mui/material";

export default function SharpCornersButton(
  {
    style, leftCornersSharp, rightCornersSharp, children, ...rest
  }: React.PropsWithChildren<
    ButtonProps & { leftCornersSharp?: boolean; rightCornersSharp?: boolean; }
  >
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
  return <Button style={s} {...rest}>{children}</Button>;
};