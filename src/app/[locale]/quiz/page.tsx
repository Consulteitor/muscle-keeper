import { setRequestLocale } from "next-intl/server";
import { QuizWizard } from "@/components/quiz/quiz-wizard";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-16">
      <QuizWizard locale={locale} />
    </main>
  );
}
