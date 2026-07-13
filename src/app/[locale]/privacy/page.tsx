import { getTranslations, setRequestLocale } from "next-intl/server";

const CONTACT_EMAIL_PLACEHOLDER = "(pendent de configurar — NEXT_PUBLIC_CONTACT_EMAIL)";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL_PLACEHOLDER;
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="font-serif text-3xl font-medium">{t("title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("updated")}</p>
      <p className="mt-6 text-muted-foreground leading-relaxed">{t("intro")}</p>

      <div className="mt-10 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {section.body.replace("{contactEmail}", contactEmail)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
