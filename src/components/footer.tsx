"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const isWizard = pathname.startsWith("/quiz");

  if (isWizard) {
    return (
      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground-2">
        <p>{t("disclaimer")}</p>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-muted-foreground">
        <p className="leading-relaxed">{t("disclaimer")}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span>
              © {year} {t("rights")}
            </span>
            <Link href="/privacy" className="underline hover:text-foreground">
              {t("privacyLink")}
            </Link>
          </div>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
