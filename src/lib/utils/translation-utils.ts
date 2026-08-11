import { Dictionary } from "./dictionaries";

function fillArgs(text: string, args: [string, string][]) {
  const [key, value] = args.shift()!;
  let arr = text.split(`{{${key}}}`);
  if (args.length)
    arr = arr.map(item => fillArgs(item, args.concat()));
  return arr.join(value);
}

export default function translate(dict: Dictionary, defaultDict: Dictionary, key: string, args?: Record<string, string>) {
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
}