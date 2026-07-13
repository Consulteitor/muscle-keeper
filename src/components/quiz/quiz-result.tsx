"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { DiagnosticResult } from "@/lib/diagnostic";
import { RiskBadge } from "./risk-badge";

export function QuizResult({ result }: { result: DiagnosticResult }) {
  const t = useTranslations("quiz.result");

  const primaryCards = [
    {
      label: t("cards.estimatedLeanLost"),
      value: `${result.estimatedLeanLostKg} ${t("units.kg")}`,
    },
    {
      label: t("cards.proteinFloor"),
      value: `${result.proteinFloorG} ${t("units.g")}`,
    },
    {
      label: t("cards.proteinGap"),
      value: `${result.proteinGapG} ${t("units.g")}`,
    },
  ];

  const secondaryCards = [
    {
      label: t("cards.weightLost"),
      value: `${result.weightLostKg} ${t("units.kg")}`,
    },
    {
      label: t("cards.leanLossRatio"),
      value: `${result.leanLossRatio}${t("units.pct")}`,
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
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">{t("title")}</h2>
        <RiskBadge riskLevel={result.riskLevel} />
        <p className="text-muted-foreground leading-relaxed">
          {t(`interpretation.${result.riskLevel}`)}
        </p>
      </div>

      {result.topFactors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">{t("factorsTitle")}</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {result.topFactors.map((factor) => (
              <li
                key={factor}
                className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
              >
                <span aria-hidden="true">—</span>
                <span>{t(`factors.${factor}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-md border border-border bg-surface-2 p-4">
        <h3 className="text-sm font-semibold">{t("methodology.title")}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {t("methodology.body")}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {primaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-md border border-border bg-surface p-4"
          >
            <dt className="text-sm text-muted-foreground">{card.label}</dt>
            <dd className="mt-1 text-xl font-semibold">{card.value}</dd>
          </div>
        ))}
      </dl>

      <details className="group">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          {t("secondaryDataToggle")}
        </summary>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {secondaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-md border border-border bg-surface p-3"
            >
              <dt className="text-xs text-muted-foreground">{card.label}</dt>
              <dd className="mt-1 text-base font-medium">{card.value}</dd>
            </div>
          ))}
        </dl>
      </details>

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
