"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { DiagnosticResult } from "@/lib/diagnostic";

const RISK_CLASSES: Record<DiagnosticResult["riskLevel"], string> = {
  baix: "bg-risk-baix/15 text-risk-baix border-risk-baix/40",
  mitja: "bg-risk-mitja/15 text-risk-mitja border-risk-mitja/40",
  alt: "bg-risk-alt/15 text-risk-alt border-risk-alt/40",
};

export function QuizResult({ result }: { result: DiagnosticResult }) {
  const t = useTranslations("quiz.result");

  const cards = [
    {
      label: t("cards.weightLost"),
      value: `${result.weightLostKg} ${t("units.kg")}`,
    },
    {
      label: t("cards.estimatedLeanLost"),
      value: `${result.estimatedLeanLostKg} ${t("units.kg")}`,
    },
    {
      label: t("cards.leanLossRatio"),
      value: `${result.leanLossRatio}${t("units.pct")}`,
    },
    {
      label: t("cards.proteinFloor"),
      value: `${result.proteinFloorG} ${t("units.g")}`,
    },
    {
      label: t("cards.proteinGap"),
      value: `${result.proteinGapG} ${t("units.g")}`,
    },
    {
      label: t("cards.projected6m"),
      value: `${result.projected6mLeanLossKg} ${t("units.kg")}`,
    },
    {
      label: t("cards.bmrDrop"),
      value: `${result.bmrDropKcal} ${t("units.kcalDay")}`,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">{t("title")}</h2>
        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${RISK_CLASSES[result.riskLevel]}`}
        >
          {t("riskLevel.label")}: {t(`riskLevel.${result.riskLevel}`)}
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-md border border-border bg-surface p-4"
          >
            <dt className="text-sm text-muted-foreground">{card.label}</dt>
            <dd className="mt-1 text-xl font-semibold">{card.value}</dd>
          </div>
        ))}
      </dl>

      <p className="rounded-md border border-border bg-surface-2 p-4 text-sm text-muted-foreground leading-relaxed">
        {t("disclaimerBox")}
      </p>

      <div className="rounded-md border border-accent/40 bg-accent/5 p-6">
        <h3 className="text-lg font-semibold">{t("ctaTitle")}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {t("ctaBody")}
        </p>
        <p className="mt-4 text-sm font-medium text-accent">
          {t("ctaConfirm")}
        </p>
      </div>

      <Link
        href="/"
        className="text-sm text-muted-foreground underline hover:text-foreground"
      >
        {t("restart")}
      </Link>
    </div>
  );
}
