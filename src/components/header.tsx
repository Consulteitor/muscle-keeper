"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();

  if (pathname.startsWith("/quiz")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-base font-medium">
          {t("nav.brand")}
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/privacy"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            {t("footer.privacyLink")}
          </Link>
          <LocaleSwitcher />
          <Link
            href="/quiz"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            {t("landing.secondaryCta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
