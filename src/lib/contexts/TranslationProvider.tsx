"use client";

import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { Dictionary } from "@/lib/utils/dictionaries";

function fillArgs(text: string, args: [string, string][]) {
  const [key, value] = args.shift()!;
  let arr = text.split(`{{${key}}}`);
  if (args.length)
    arr = arr.map(item => fillArgs(item, args.concat()));
  return arr.join(value);
}

type Callback = (key: string, args?: { [key: string]: string }) => string;

const context = createContext<Callback>(((key: string) => key));

export const TranslationProvider = ({ children, dict, defaultDict }: PropsWithChildren<{ dict: Dictionary, defaultDict: Dictionary }>) => {
  const t = useCallback(((key, args) => {
    const keys = key.split(".");
    let text = dict[keys[0]];
    let defaultText = defaultDict[keys[0]];
    for (let i = 1; i < keys.length; i++) {
      if (text)
        text = (text as Dictionary)[keys[i]];
      if (defaultText)
        defaultText = (defaultText as Dictionary)[keys[i]];
    }
    if (text === undefined) {
      if (defaultText === undefined) {
        console.error(`Missing key in default dictionary: ${key}`);
        return key;
      }
      console.warn(`Missing key in current dictionary: ${key}. Using default dictionary instead.`)
      text = defaultText;
    }
    if (!args)
      return text as string;
    return fillArgs(text as string, Object.entries(args));
  }) as Callback, [dict, defaultDict]);
  const Provider = context.Provider;

  return <Provider value={t}>{children}</Provider>;
};

export const useTranslation = () => useContext(context);
