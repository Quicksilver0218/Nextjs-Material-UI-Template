import { LOCALES } from "@/proxy";
import "server-only";

export type Dictionary = { [key: string]: string | Dictionary };

const dictionaries: { [key: string]: Promise<Dictionary> } = {};

for (const locale of LOCALES)
  dictionaries[locale] = import(`@/dictionaries/${locale}.json`).then(module => module.default);

export default function getDictionary(locale: string) { return dictionaries[locale]; };