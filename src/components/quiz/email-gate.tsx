"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailGate({
  onSubmit,
}: {
  onSubmit: (input: {
    email: string;
    consentHealthData: boolean;
    consentMarketing: boolean;
  }) => Promise<void>;
}) {
  const t = useTranslations("quiz.emailGate");
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-balance">{t("title")}</h2>
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
        className="rounded-md bg-accent px-8 py-3 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
