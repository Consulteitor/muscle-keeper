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
  const [level, setLevel] = useState<RiskLevel>("mitja");
  const count = FACTOR_COUNTS[level];

  return (
    <div className="rounded-2xl border border-border-strong bg-surface-elevated p-6 shadow-lg shadow-black/[0.06]">
      <p className="text-sm text-muted-foreground">{title}</p>

      <div className="mt-3 flex flex-wrap gap-2">
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
        <div className="flex items-center justify-between border-t border-border py-4">
          <dt className="text-sm text-muted-foreground">{factorsLabel}</dt>
          <dd className="text-base font-semibold transition-all duration-200">
            {count} {count === 1 ? factorsUnitSingular : factorsUnit}
          </dd>
        </div>
      </dl>
    </div>
  );
}
