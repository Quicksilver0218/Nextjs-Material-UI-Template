"use client";

import { createContext, PropsWithChildren, useContext } from "react";

const context = createContext<[string | undefined]>([undefined]);

export function NameProvider({ children, name }: PropsWithChildren<{ name?: string }>) {
  return <context.Provider value={[name]}>{children}</context.Provider>;
}

export function useName() {
  return useContext(context);
}