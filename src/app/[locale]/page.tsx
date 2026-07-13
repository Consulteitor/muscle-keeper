import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { HeroRiskPreview } from "@/components/landing/hero-risk-preview";

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

  const valueItems = t.raw("valueStrip.items") as { title: string; body: string }[];
  const problemPoints = t.raw("problem.points") as string[];
  const steps = t.raw("howItWorks.steps") as { title: string; body: string }[];
  const whatYouGetItems = t.raw("whatYouGet.items") as string[];
  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];
  const previewRows = t.raw("heroPreview.rows") as {
    label: string;
    value: string;
  }[];
  const [massRow, proteinRow, factorsRow] = previewRows;
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
            <h1 className="mt-4 max-w-2xl font-serif text-4xl font-medium leading-[1.15] sm:text-5xl">
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

          <HeroRiskPreview
            title={t("heroPreview.title")}
            staticRows={[massRow, proteinRow]}
            factorsLabel={factorsRow.label}
            factorsUnit={t("heroPreview.factorsUnit")}
            factorsUnitSingular={t("heroPreview.factorsUnitSingular")}
          />
        </div>

        <p className="mx-auto max-w-6xl px-6 pt-10 pb-16 text-xs text-muted-foreground-2 lg:pt-12 lg:pb-20">
          {t("disclaimerNote")}
        </p>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          {valueItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <h2 className="font-serif text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wide text-accent">
              {t("problem.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium leading-snug">
              {t("problem.title")}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-muted-foreground leading-relaxed">
              {t("problem.body")}
            </p>
            <ul className="mt-6 flex flex-col">
              {problemPoints.map((point, i) => (
                <li
                  key={point}
                  className={`py-3 text-sm text-foreground ${i > 0 ? "border-t border-border" : ""}`}
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <h2 className="font-serif text-2xl font-medium">{t("howItWorks.title")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm shadow-black/[0.04] transition-shadow hover:shadow-md hover:shadow-black/[0.06]">
                  <span className="font-serif text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/quiz"
              className="rounded-md border border-accent px-8 py-3 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {t("secondaryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="font-serif text-2xl font-medium">{t("whatYouGet.title")}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {t("whatYouGet.body")}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whatYouGetItems.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-surface p-4 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="font-serif text-2xl font-medium">{t("faq.title")}</h2>
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
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16">
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-accent/25 bg-surface-elevated p-10 text-center shadow-lg shadow-black/[0.05] sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)",
              }}
            />
            <p className="relative text-xs font-medium uppercase tracking-wide text-accent">
              {t("finalCta.eyebrow")}
            </p>
            <h2 className="relative mt-3 font-serif text-2xl font-medium text-balance sm:text-3xl">
              {t("finalCta.title")}
            </h2>
            <p className="relative mt-3 text-muted-foreground">
              {t("finalCta.subtitle")}
            </p>
            <div className="relative mt-8 flex justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                {t("finalCta.cta")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="relative mt-3 text-sm text-muted-foreground-2">
              {t("finalCta.microcopy")}
            </p>
          </div>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
