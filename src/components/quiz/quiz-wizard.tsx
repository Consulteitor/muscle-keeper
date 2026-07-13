"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { STEPS } from "./steps";
import { QuizStep } from "./quiz-step";
import { EmailGate } from "./email-gate";
import { QuizResult } from "./quiz-result";
import { computeDiagnostic, type QuizAnswers, type DiagnosticResult } from "@/lib/diagnostic";
import { getSupabaseClient } from "@/lib/supabase/client";

type RawAnswers = Record<string, string | string[] | undefined>;
type Phase = "form" | "calculating" | "gate" | "result";

function toQuizAnswers(raw: RawAnswers): QuizAnswers {
  return {
    sex: raw.sex as QuizAnswers["sex"],
    birthYear: Number(raw.birthYear),
    heightCm: Number(raw.heightCm),
    currentWeightKg: Number(raw.currentWeightKg),
    startingWeightKg: Number(raw.startingWeightKg),
    targetWeightKg: Number(raw.targetWeightKg),
    medication: raw.medication as QuizAnswers["medication"],
    treatmentDuration: raw.treatmentDuration as QuizAnswers["treatmentDuration"],
    baselineStrengthFrequency:
      raw.baselineStrengthFrequency as QuizAnswers["baselineStrengthFrequency"],
    availableDays: raw.availableDays as QuizAnswers["availableDays"],
    symptoms: (raw.symptoms as string[] | undefined ?? []) as QuizAnswers["symptoms"],
    proteinRations: raw.proteinRations as QuizAnswers["proteinRations"],
  };
}

function isStepValid(kind: string, value: string | string[] | undefined, min?: number, max?: number) {
  if (kind === "multi") return true;
  if (kind === "number") {
    const n = Number(value);
    if (!value || Number.isNaN(n)) return false;
    if (min !== undefined && n < min) return false;
    if (max !== undefined && n > max) return false;
    return true;
  }
  return typeof value === "string" && value.length > 0;
}

export function QuizWizard({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<RawAnswers>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const step = STEPS[index];
  const value = answers[step?.field];
  const valid = step ? isStepValid(step.kind, value, step.min, step.max) : false;

  function handleNext() {
    if (index < STEPS.length - 1) {
      setIndex(index + 1);
      return;
    }
    const diagnostic = computeDiagnostic(toQuizAnswers(answers));
    setResult(diagnostic);
    setPhase("calculating");
    window.setTimeout(() => setPhase("gate"), 1100);
  }

  function handleBack() {
    if (index > 0) setIndex(index - 1);
  }

  async function handleGateSubmit(input: {
    email: string;
    consentHealthData: boolean;
    consentMarketing: boolean;
  }) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").insert({
      email: input.email,
      locale,
      answers,
      diagnostic: result,
      consent_health_data: input.consentHealthData,
      consent_marketing: input.consentMarketing,
    });
    if (error) throw error;
    setPhase("result");
  }

  if (phase === "calculating") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-muted-foreground">{t("calculating")}</p>
      </div>
    );
  }

  if (phase === "gate") {
    return <EmailGate onSubmit={handleGateSubmit} />;
  }

  if (phase === "result" && result) {
    return <QuizResult result={result} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          {t("progress", { step: index + 1, total: STEPS.length })}
        </p>
        <div className="mt-2 h-1 w-full rounded-full bg-surface-2">
          <div
            className="h-1 rounded-full bg-accent transition-all"
            style={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1">
        <QuizStep
          step={step}
          value={value}
          onChange={(v) => setAnswers((prev) => ({ ...prev, [step.field]: v }))}
        />
      </div>

      <div className="mt-10 flex items-center justify-between">
        {index === 0 ? (
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            {t("back")}
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleBack}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t("back")}
          </button>
        )}
        <button
          type="button"
          disabled={!valid}
          onClick={handleNext}
          className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
