"use client";

import { createContext, PropsWithChildren, useContext } from "react";

const context = createContext("");

export function LocaleProvider({ children, locale }: PropsWithChildren<{ locale: string }>) {
  return <context.Provider value={locale}>{children}</context.Provider>;
}

export function useLocale() {
  return useContext(context);
}