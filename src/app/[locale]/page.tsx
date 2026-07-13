import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("landing");

  const steps = t.raw("howItWorks.steps") as string[];
  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];

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
      <section className="mx-auto flex max-w-3xl flex-1 flex-col justify-center px-6 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("hero.eyebrow")}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/quiz"
            className="rounded-md bg-accent px-8 py-3 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t("hero.cta")}
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
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
