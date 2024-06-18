import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "@/lib/zod.json";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

void i18next.init({
  lng: "vi",
  resources: {
    vi: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export { z }