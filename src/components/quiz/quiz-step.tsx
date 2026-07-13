"use client";

import { useTranslations } from "next-intl";
import type { StepConfig } from "./steps";

function CheckIndicator({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border-strong bg-transparent"
      }`}
    >
      {active && (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
          <path
            d="M3 8.5L6.2 11.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export function QuizStep({
  step,
  value,
  category,
  onChange,
}: {
  step: StepConfig;
  value: string | string[] | undefined;
  category?: string;
  onChange: (value: string | string[]) => void;
}) {
  const t = useTranslations("quiz");
  const question = t(`fields.${step.field}.question`);
  const optionCount = step.options?.length ?? 0;
  const gridClass = optionCount > 2 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";

  const eyebrow = category && (
    <p className="text-xs font-medium uppercase tracking-wide text-accent">
      {category}
    </p>
  );

  if (step.kind === "number") {
    const placeholder = t(`fields.${step.field}.placeholder`);
    return (
      <div>
        {eyebrow}
        <h2 className="mt-2 font-serif text-2xl font-medium leading-snug text-balance sm:text-3xl">
          {question}
        </h2>
        <input
          type="number"
          inputMode="numeric"
          value={(value as string) ?? ""}
          min={step.min}
          max={step.max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="mt-6 w-full rounded-md border border-border-strong bg-surface px-4 py-3 text-lg outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
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
        {eyebrow}
        <h2 className="mt-2 font-serif text-2xl font-medium leading-snug text-balance sm:text-3xl">
          {question}
        </h2>
        {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
        <div className={`mt-6 grid gap-3 ${gridClass}`}>
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
                className={`flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${
                  active
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border-strong bg-surface text-foreground hover:border-accent/50 hover:bg-surface-2"
                }`}
              >
                <span>{t(`fields.${step.field}.options.${opt}`)}</span>
                <CheckIndicator active={active} />
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
      {eyebrow}
      <h2 className="mt-2 font-serif text-2xl font-medium leading-snug text-balance sm:text-3xl">
        {question}
      </h2>
      {singleHint && (
        <p className="mt-2 text-sm text-muted-foreground">{singleHint}</p>
      )}
      <div className={`mt-6 grid gap-3 ${gridClass}`}>
        {step.options?.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${
                active
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border-strong bg-surface text-foreground hover:border-accent/50 hover:bg-surface-2"
              }`}
            >
              <span>{t(`fields.${step.field}.options.${opt}`)}</span>
              <CheckIndicator active={active} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
