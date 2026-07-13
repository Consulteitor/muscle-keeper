"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { DiagnosticResult } from "@/lib/diagnostic";
import { RiskBadge } from "./risk-badge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TEASER_CARD_KEYS = [
  "estimatedLeanLost",
  "proteinFloor",
  "proteinGap",
] as const;

export function EmailGate({
  result,
  onSubmit,
}: {
  result: DiagnosticResult;
  onSubmit: (input: {
    email: string;
    consentHealthData: boolean;
    consentMarketing: boolean;
  }) => Promise<void>;
}) {
  const t = useTranslations("quiz.emailGate");
  const tResult = useTranslations("quiz.result");
  const [email, setEmail] = useState("");
  const [consentHealth, setConsentHealth] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError(t("errorEmail"));
      return;
    }
    if (!consentHealth) {
      setError(t("errorConsent"));
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        email,
        consentHealthData: consentHealth,
        consentMarketing,
      });
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl font-medium">{tResult("title")}</h2>
        <RiskBadge riskLevel={result.riskLevel} />
        <p className="text-muted-foreground leading-relaxed">
          {tResult(`interpretation.${result.riskLevel}`)}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-hidden="true">
        {TEASER_CARD_KEYS.map((key) => (
          <div
            key={key}
            className="rounded-md border border-border bg-surface p-4"
          >
            <dt className="text-sm text-muted-foreground">
              {tResult(`cards.${key}`)}
            </dt>
            <dd className="mt-1 text-xl font-semibold blur-sm select-none">
              •••
            </dd>
          </div>
        ))}
      </dl>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold text-balance">{t("title")}</h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {t("body")}
          </p>
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-muted-foreground">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            autoFocus
            className="mt-2 w-full rounded-md border border-border bg-surface px-4 py-3 text-lg outline-none focus:border-accent"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={consentHealth}
            onChange={(e) => setConsentHealth(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span>{t("consentHealth")}</span>
        </label>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={consentMarketing}
            onChange={(e) => setConsentMarketing(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span>{t("consentMarketing")}</span>
        </label>

        {error && <p className="text-sm text-risk-alt">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-accent px-8 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
