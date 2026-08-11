"use client";

import { useState, useEffect, MouseEvent, PropsWithChildren, useCallback } from "react";

import Button, { ButtonProps } from "@mui/material/Button";

export default function CooldownButton({ cooldown, children, ...props }: PropsWithChildren<ButtonProps & { cooldown: number }>) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleClick = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      await props.onClick?.(e);
      setTimeLeft(cooldown);
    } catch (error) {
      if (error !== false)
        throw error;
    }
  }, [cooldown, props]);

  const isOnCooldown = timeLeft > 0;

  return (
    <Button
      {...props}
      disabled={isOnCooldown || props.disabled}
      onClick={handleClick}
    >
      {children}{isOnCooldown ? ` (${timeLeft})` : ""}
    </Button>
  );
}