"use client";

import { useTranslations } from "next-intl";
import type { StepConfig } from "./steps";

export function QuizStep({
  step,
  value,
  onChange,
}: {
  step: StepConfig;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}) {
  const t = useTranslations("quiz");
  const question = t(`fields.${step.field}.question`);

  if (step.kind === "number") {
    const placeholder = t(`fields.${step.field}.placeholder`);
    return (
      <div>
        <h2 className="text-2xl font-semibold text-balance">{question}</h2>
        <input
          type="number"
          inputMode="numeric"
          value={(value as string) ?? ""}
          min={step.min}
          max={step.max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="mt-6 w-full rounded-md border border-border bg-surface px-4 py-3 text-lg outline-none focus:border-accent"
        />
      </div>
    );
  }

  if (step.kind === "multi") {
    const selected = (value as string[]) ?? [];
    const hint = t.has(`fields.${step.field}.hint`)
      ? t(`fields.${step.field}.hint`)
      : undefined;
    return (
      <div>
        <h2 className="text-2xl font-semibold text-balance">{question}</h2>
        {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {step.options?.map((opt) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  onChange(
                    active
                      ? selected.filter((s) => s !== opt)
                      : [...selected, opt],
                  )
                }
                aria-pressed={active}
                className={`rounded-md border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border bg-surface text-muted-foreground hover:border-accent/60"
                }`}
              >
                {t(`fields.${step.field}.options.${opt}`)}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const singleHint = t.has(`fields.${step.field}.hint`)
    ? t(`fields.${step.field}.hint`)
    : undefined;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-balance">{question}</h2>
      {singleHint && (
        <p className="mt-2 text-sm text-muted-foreground">{singleHint}</p>
      )}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {step.options?.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`rounded-md border px-4 py-3 text-left transition-colors ${
                active
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-accent/60"
              }`}
            >
              {t(`fields.${step.field}.options.${opt}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
