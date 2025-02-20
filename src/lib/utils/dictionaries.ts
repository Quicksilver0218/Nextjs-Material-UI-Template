import { locales } from "@/middleware";
import "server-only";

const dictionaries: { [key: string]: Promise<{ [key: string]: string }> } = {};

for (const locale of locales)
  dictionaries[locale] = import(`@/dictionaries/${locale}.json`).then((module) => module.default);

export default function getDictionary(locale: string) { return dictionaries[locale]; };