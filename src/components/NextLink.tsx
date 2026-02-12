"use client";

import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export default function NextLink({ prefetch, onClick, children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link
      prefetch={prefetch ?? false}
      onClick={e => {
        e.preventDefault(); // Skip RSC requests
        location.assign(e.currentTarget.href);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
