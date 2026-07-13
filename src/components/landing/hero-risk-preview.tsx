"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { RiskLevel } from "@/lib/diagnostic";

const LEVELS: RiskLevel[] = ["baix", "mitja", "alt"];

const FACTOR_COUNTS: Record<RiskLevel, number> = {
  baix: 1,
  mitja: 3,
  alt: 5,
};

const GAUGE_SHARE: Record<RiskLevel, number> = {
  baix: 1 / 3,
  mitja: 2 / 3,
  alt: 1,
};

const GAUGE_COLOR_VAR: Record<RiskLevel, string> = {
  baix: "var(--risk-baix)",
  mitja: "var(--risk-mitja)",
  alt: "var(--risk-alt)",
};

const CHIP_ACTIVE_CLASSES: Record<RiskLevel, string> = {
  baix: "border-risk-baix/40 bg-risk-baix/15 text-risk-baix",
  mitja: "border-risk-mitja/40 bg-risk-mitja/15 text-risk-mitja",
  alt: "border-risk-alt/40 bg-risk-alt/15 text-risk-alt",
};

export function HeroRiskPreview({
  title,
  staticRows,
  factorsLabel,
  factorsUnit,
  factorsUnitSingular,
}: {
  title: string;
  staticRows: { label: string; value: string }[];
  factorsLabel: string;
  factorsUnit: string;
  factorsUnitSingular: string;
}) {
  const tResult = useTranslations("quiz.result");
  const tGauge = useTranslations("landing.heroPreview.gaugeLabels");
  const [level, setLevel] = useState<RiskLevel>("mitja");
  const count = FACTOR_COUNTS[level];
  const share = GAUGE_SHARE[level];
  const color = GAUGE_COLOR_VAR[level];

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 -rotate-3 rounded-3xl bg-lime/60"
      />
      <div className="relative rounded-3xl border border-border-strong bg-surface-elevated p-6 shadow-lg shadow-black/[0.08]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div
            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-[background] duration-300"
            style={{
              background: `conic-gradient(${color} ${share * 360}deg, color-mix(in srgb, ${color} 12%, transparent) 0deg)`,
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated text-center text-[10px] font-semibold leading-tight text-foreground">
              {tGauge(level)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              aria-pressed={level === l}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                level === l
                  ? CHIP_ACTIVE_CLASSES[l]
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
            >
              {tResult(`riskLevel.${l}`)}
            </button>
          ))}
        </div>

        <dl className="mt-6 flex flex-col">
          {staticRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-t border-border py-4 first:border-t-0 first:pt-0"
            >
              <dt className="text-sm text-muted-foreground">{row.label}</dt>
              <dd className="text-base font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-dark px-4 py-3.5">
          <dt className="text-sm text-on-dark-muted">{factorsLabel}</dt>
          <dd className="text-base font-semibold text-lime transition-all duration-200">
            {count} {count === 1 ? factorsUnitSingular : factorsUnit}
          </dd>
        </div>
      </div>
    </div>
  );
}
