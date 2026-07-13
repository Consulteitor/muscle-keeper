"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { STEPS, TRANSITION_AFTER_INDEX } from "./steps";
import { QuizStep } from "./quiz-step";
import { EmailGate } from "./email-gate";
import { QuizResult } from "./quiz-result";
import { WizardHeader } from "./wizard-header";
import { WizardCard } from "./wizard-card";
import { computeDiagnostic, type QuizAnswers, type DiagnosticResult } from "@/lib/diagnostic";
import { getSupabaseClient } from "@/lib/supabase/client";

type RawAnswers = Record<string, string | string[] | undefined>;
type Phase = "form" | "transition" | "calculating" | "gate" | "result";

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

function CalculatingSequence() {
  const t = useTranslations("quiz");
  const messages = t.raw("calculatingSteps") as string[];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= messages.length - 1) return;
    const id = window.setTimeout(() => setI((prev) => prev + 1), 800);
    return () => window.clearTimeout(id);
  }, [i, messages.length]);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      <p className="text-muted-foreground">{messages[i]}</p>
    </div>
  );
}

export function QuizWizard({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<RawAnswers>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [transitionKey, setTransitionKey] = useState<"afterPersonal" | "beforeHabits" | null>(
    null,
  );
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const step = STEPS[index];
  const value = answers[step?.field];
  const valid = step ? isStepValid(step.kind, value, step.min, step.max) : false;

  function advanceToStep(nextIndex: number) {
    setIndex(nextIndex);
    setPhase("form");
  }

  function handleNext() {
    if (index < STEPS.length - 1) {
      const nextIndex = index + 1;
      const transition = TRANSITION_AFTER_INDEX[index];
      if (transition) {
        setTransitionKey(transition);
        setPhase("transition");
        window.setTimeout(() => advanceToStep(nextIndex), 1400);
      } else {
        advanceToStep(nextIndex);
      }
      return;
    }
    const diagnostic = computeDiagnostic(toQuizAnswers(answers));
    setResult(diagnostic);
    setPhase("calculating");
    window.setTimeout(() => setPhase("gate"), 2400);
  }

  function handleBack() {
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    router.push("/");
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

  if (phase === "transition" && transitionKey) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="max-w-sm font-serif text-xl font-medium text-balance">
          {t(`transitions.${transitionKey}`)}
        </p>
      </div>
    );
  }

  if (phase === "calculating") {
    return <CalculatingSequence />;
  }

  if (phase === "gate" && result) {
    return (
      <div className="mx-auto w-full max-w-[720px] flex-1 px-6 py-12">
        <EmailGate result={result} onSubmit={handleGateSubmit} />
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="mx-auto w-full max-w-[720px] flex-1 px-6 py-12">
        <QuizResult result={result} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <WizardHeader
        step={index + 1}
        total={STEPS.length}
        category={t(`categories.${step.category}`)}
        onBack={handleBack}
      />
      <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-start px-6 py-8 lg:justify-center lg:py-10">
        <WizardCard>
          <QuizStep
            step={step}
            value={value}
            onChange={(v) => setAnswers((prev) => ({ ...prev, [step.field]: v }))}
          />
          <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 flex justify-end border-t border-border bg-surface-elevated px-6 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:static sm:mx-0 sm:mb-0 sm:pb-6">
            <button
              type="button"
              disabled={!valid}
              onClick={handleNext}
              className="w-full rounded-md bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:bg-surface-2 disabled:text-muted-foreground-2 sm:w-auto"
            >
              {t("next")}
            </button>
          </div>
        </WizardCard>
      </div>
    </div>
  );
}
