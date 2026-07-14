"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function WizardHeader({
  step,
  total,
  category,
  onBack,
}: {
  step: number;
  total: number;
  category?: string;
  onBack: () => void;
}) {
  const t = useTranslations("quiz");
  const pct = Math.round((step / total) * 100);

  return (
    <div className="border-b border-border">
      <div className="mx-auto flex max-w-[720px] items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {t("back")}
        </button>
        <p className="text-sm text-muted-foreground">
          {t("progress", { step, total })}
        </p>
        <Link
          href="/"
          className="text-sm text-muted-foreground-2 hover:text-foreground"
        >
          {t("exit")}
        </Link>
      </div>
      <div className="mx-auto max-w-[720px] px-6 pb-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        {category && (
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent">
            {category}
          </p>
        )}
      </div>
    </div>
  );
}
