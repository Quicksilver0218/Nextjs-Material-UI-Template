"use client";

import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { Dictionary } from "@/lib/utils/dictionaries";
import translate from "@/lib/utils/translation-utils";

type Callback = (key: string, args?: { [key: string]: string }) => string;

const context = createContext<Callback>(((key: string) => key));

export const TranslationProvider = ({ children, dict, defaultDict }: PropsWithChildren<{ dict: Dictionary, defaultDict: Dictionary }>) => {
  const t = useCallback((key, args) => translate(dict, defaultDict, key, args), [dict, defaultDict]) as Callback;
  const Provider = context.Provider;

  return <Provider value={t}>{children}</Provider>;
};

export const useTranslation = () => useContext(context);
