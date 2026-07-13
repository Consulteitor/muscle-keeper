import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

function splitHeroTitle(title: string): [string, string] {
  const idx = title.indexOf(". ");
  if (idx === -1) return [title, ""];
  return [title.slice(0, idx + 1), title.slice(idx + 2)];
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("landing");
  const tResult = await getTranslations("quiz.result");

  const steps = t.raw("howItWorks.steps") as string[];
  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];
  const previewRows = t.raw("heroPreview.rows") as {
    label: string;
    value: string;
  }[];
  const [titleLead, titleRest] = splitHeroTitle(t("hero.title"));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 pt-20 lg:grid-cols-2 lg:items-center lg:pt-28">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              <span>{titleLead}</span>{" "}
              <span className="text-muted-foreground">{titleRest}</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                {t("hero.cta")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground-2">
              {t("hero.trust")}
            </p>
          </div>

          <div className="rounded-2xl border border-border-strong bg-surface-elevated p-6 shadow-lg shadow-black/20">
            <p className="text-sm text-muted-foreground">
              {t("heroPreview.title")}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-risk-mitja/40 bg-risk-mitja/15 px-4 py-1.5 text-sm font-medium text-risk-mitja">
              {tResult("riskLevel.mitja")}
            </div>
            <dl className="mt-6 flex flex-col">
              {previewRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between py-4 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <dt className="text-sm text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="text-base font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mx-auto max-w-6xl px-6 pt-10 pb-16 text-xs text-muted-foreground-2 lg:pt-12 lg:pb-20">
          {t("disclaimerNote")}
        </p>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold">{t("problem.title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("problem.body")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold">{t("howItWorks.title")}</h2>
        <ol className="mt-6 space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium">
                {i + 1}
              </span>
              <span className="pt-1 text-muted-foreground leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Link
            href="/quiz"
            className="rounded-md border border-accent px-8 py-3 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t("secondaryCta")}
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold">{t("faq.title")}</h2>
          <div className="mt-6 flex flex-col gap-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
