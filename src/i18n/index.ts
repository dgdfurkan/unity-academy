import { tr, type Dictionary } from "./dictionaries/tr";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
export * from "./config";
