"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const isWizard = pathname.startsWith("/quiz");

  if (isWizard) {
    return (
      <footer className="border-t border-border px-6 py-3 text-center text-xs text-muted-foreground-2">
        <p>{t("disclaimer")}</p>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-serif text-sm font-medium">{tNav("brand")}</span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground"
            >
              {t("privacyLink")}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground-2">
          <p className="leading-relaxed">{t("disclaimer")}</p>
          <span className="whitespace-nowrap">
            © {year} {t("rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
