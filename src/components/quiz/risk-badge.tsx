"use client";

import { useTranslations } from "next-intl";
import type { RiskLevel } from "@/lib/diagnostic";

const RISK_CLASSES: Record<RiskLevel, string> = {
  baix: "bg-risk-baix/15 text-risk-baix border-risk-baix/40",
  mitja: "bg-risk-mitja/15 text-risk-mitja border-risk-mitja/40",
  alt: "bg-risk-alt/15 text-risk-alt border-risk-alt/40",
};

export function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  const t = useTranslations("quiz.result");

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${RISK_CLASSES[riskLevel]}`}
    >
      {t("riskLevel.label")}: {t(`riskLevel.${riskLevel}`)}
    </div>
  );
}
