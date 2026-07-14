"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { DiagnosticResult } from "@/lib/diagnostic";
import { RiskBadge } from "./risk-badge";

export function QuizResult({
  result,
  locale,
}: {
  result: DiagnosticResult;
  locale: string;
}) {
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
        <h2 className="font-serif text-2xl font-medium">{t("title")}</h2>
        <RiskBadge riskLevel={result.riskLevel} />
        <p className="text-muted-foreground leading-relaxed">
          {t(`interpretation.${result.riskLevel}`)}
        </p>
      </div>

      {result.topFactors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">{t("factorsTitle")}</h3>
          <ul className="mt-3 flex flex-col rounded-2xl border border-border bg-surface px-4">
            {result.topFactors.map((factor, i) => (
              <li
                key={factor}
                className={`flex items-start gap-3 py-3.5 text-sm text-foreground leading-relaxed ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-foreground"
                >
                  ✓
                </span>
                <span>{t(`factors.${factor}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.topFactors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">{t("actionsTitle")}</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {result.topFactors.map((factor) => (
              <li
                key={factor}
                className="flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm text-foreground leading-relaxed"
              >
                <span aria-hidden="true" className="text-accent">→</span>
                <span>{t(`actions.${factor}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl bg-surface-dark p-6 text-on-dark-foreground">
        <h3 className="text-lg font-semibold">{t("guide.title")}</h3>
        <p className="mt-2 text-on-dark-muted leading-relaxed">{t("guide.body")}</p>
        <a
          href={`/guides/muscle-keeper-guia-${locale}.pdf`}
          download
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-sm font-medium text-lime-foreground transition-colors hover:bg-lime-strong"
        >
          {t("guide.cta")}
          <span aria-hidden="true">↓</span>
        </a>
        <p className="mt-3 text-xs text-on-dark-muted">{t("guide.note")}</p>
      </div>

      <div className="rounded-xl border border-border bg-surface-2 p-4">
        <h3 className="text-sm font-semibold">{t("methodology.title")}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {t("methodology.body")}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {primaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-surface p-4"
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
              className="rounded-xl border border-border bg-surface p-3"
            >
              <dt className="text-xs text-muted-foreground">{card.label}</dt>
              <dd className="mt-1 text-base font-medium">{card.value}</dd>
            </div>
          ))}
        </dl>
      </details>

      <p className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-muted-foreground leading-relaxed">
        {t("disclaimerBox")}
      </p>

      <div className="rounded-2xl bg-surface-dark p-6 text-on-dark-foreground">
        <h3 className="text-lg font-semibold">{t("ctaTitle")}</h3>
        <p className="mt-2 text-on-dark-muted leading-relaxed">
          {t("ctaBody")}
        </p>
        <p className="mt-4 text-sm font-medium text-lime">
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
