"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  es: "ES",
  ca: "CA",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded px-2 py-1 transition-colors ${
            loc === locale
              ? "bg-surface-2 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-current={loc === locale}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
