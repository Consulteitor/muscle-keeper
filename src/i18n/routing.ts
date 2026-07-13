import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
